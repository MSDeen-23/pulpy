
const helper = require('../Helper/helper');
const { Crawling } = require('../Services/Crawling');
const { Campaign } = require('../Services/Campaign');
const moment = require('moment');
const { runProducer } = require('../Services/Kafka');
let logger = helper.logger
/**
 * The main function to run the campaign
 * For first login it will wait for OTP
 * if leads id empty it will looks the search url and fecth it ,push (kafka) and process the campaign.
 * @param {*} campaignData 
 * @param {*} page 
 * @returns 
 */
exports.runCampaign = async (campaignData, page) => {
  try {
    // return true
    logger.info("CampaignController::runCampaign");
    logger.info(campaignData);
    let topic_type = campaignData.topic_type;
    logger.info(topic_type);
    if (topic_type == "OTP_VERIFICATION") {
      page = await otpPage(campaignData, page);
      return
    }
    if (topic_type != "CAMPAIGN") {
      throw "Campaign only support";
    }
    let payload = campaignData.topic_data;
    if (helper.isEmpty(payload)) {
      throw `Campaign Data Required`;
    }
    logger.info(payload);
    let campaignId = payload.campaignId;

    let crawling = await new Crawling(campaignId, page);

    let campaignObj = new Campaign(payload, crawling);
    let states_response = [];

    if (payload?.searchLeadConfigItems?.searchLeadIds.length == 0) {
      let lead_list = await crawling.getLeadsFromUrl(payload.searchLeadConfigItems, page);
      await runProducer({
        "campaign_id": payload?.topic_data?.campaignId,
        "event": "GET_LEAD_LIST",
        "list": lead_list
      }, process.env.OUT_TOPIC);
      payload.searchLeadConfigItems.searchLeadIds = lead_list;
    }

    // return;
    for (let lead of payload.searchLeadConfigItems.searchLeadIds) {
      let response = {
        "lead": lead,
        "state": []
      };

      let isAlreadyRun = isAlreadyRanLead(lead, payload);
      await crawling.goToLeadPage(lead.lead_url);
      if (!isAlreadyRun) {
        if (!helper.isEmpty(payload.steps)) {
          let res = await campaignObj.processSequence(lead, payload.steps);
          response.state.push(res);
        }
      } else {
        let sequencesHistory = getLeadHistory(payload.campaign_states.states, lead);

        let nextSq = await campaignObj.getNextSequence(sequencesHistory, payload.steps, lead);
        logger.info('nextSq :: ' + JSON.stringify(nextSq));
        response.state = sequencesHistory;
        if (nextSq) {
          let res = await campaignObj.processSequence(lead, nextSq);
          response.state.push(res);
        }
      }
      logger.info("response");
      logger.info(response);
      states_response.push(response);
      await pushIntoKafka(response);
      await helper.sleep(2000);
    }
    campaignObj.updateState(states_response);
    return;
    // logger.info(getKafkaResponse());

  } catch (error) {
    if (error?.stack) {
      logger.error(error.stack);
    } else {
      logger.error(error);
    }
  }

}

async function pushIntoKafka(response) {
  try {
    logger.info("pushIntoKafka" + JSON.stringify(response));
    logger.info();
    await runProducer(response, process.env.OUT_TOPIC)
  } catch (error) {
    if (error?.stack) {
      logger.error(error.stack);
    } else {
      logger.error(error);
    }
  }
}
/**
 * check the lead already ran or not
 * @param {*} params 
 */
function isAlreadyRanLead(lead, campaign) {
  let state = ((campaign.campaign_states) && (campaign.campaign_states.states) && campaign.campaign_states.states.length) ? true : false;
  if (state) {
    // logger.info(campaign.campaign_states.states);
    let leadStates = campaign.campaign_states.states.find(e => e.lead.lead_id == lead.lead_id);
    return (leadStates) ? true : false;
  }
  return state;
}

function getLeadHistory(sequencesHistory, lead) {
  let leadStates = sequencesHistory.find(e => e.lead.lead_id == lead.lead_id);
  return leadStates.state;
}

async function otpPage(campaignData, page) {
  console.log("isOtpRequried");
  console.log(campaignData);
  return page = Crawling.enterOtp(campaignData, page);
}

