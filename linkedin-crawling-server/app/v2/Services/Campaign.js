const { logger, now, isEmpty } = require('../Helper/helper.js');
const moment = require('moment');

class Campaign {
    constructor(data, crawling) {
        this.data = data;
        this.crawling = crawling;
    }
    getCampaign() {
        return this.data;
    }
    getcampaignId() {
        return this.data.campaignId;
    }
    getLeads() {
        return this.data.leads;
    }
    getSteps() {
        return this.data.steps;
    }
    async processSequence(lead, sq) {
        logger.info("Campaign::processSequence");
        let sq_type = sq.type;
        let response = {};
        let updateResponse = {}
        switch (sq_type) {
            case 'CONNECT':
                logger.info(sq_type);
                response = await this.crawling.sendRequest(lead.lead_url, sq.messageContent);
                updateResponse.extra_info = {}
                updateResponse.extra_info.firstName = response?.firstName;
                updateResponse.extra_info.lastName = response?.lastName;
                // response = {
                //     status: 200,
                //     message: 'Request sent successfully'
                // }
                break;
            case 'MESSAGE':
                logger.info(sq_type);
                response = await this.crawling.sendMessagess(lead.lead_url, sq.messageContent);
                // response = {
                //     status: 200,
                //     message: 'message sent successfully'
                // }
                break;
            case 'FOLLOW':
                logger.info(sq_type);
                response = await this.crawling.follow(lead.lead_url);
                // response = {
                //     status: 200,
                //     message: 'message sent successfully'
                // }
                break;
            default:
                break;
        }

        updateResponse.executionId = this.data.executionID;
        updateResponse.step_id = sq.step_id;
        updateResponse.excuted_at = moment.utc().format('YYYY-MM-DD HH:mm:ss');

        if (response?.status == 200) {
            updateResponse.status = 'SUCCESS';
        } else {
            updateResponse.status = 'FAILED';
            updateResponse.reason = response?.message;
        }
        return updateResponse;
    }
    updateState(data) {
        this.data.campaign_states.states = data;
    }
    /**
     * Get the next sequence based on history.
     * sequencesHistory : campaign_states.states
     * sq : campaign.steps
     * lead : lead
     * @returns 
     */
    async getNextSequence(sequencesHistory, sq, lead) {
        // Getting the latest lead history
        let lastState = sequencesHistory[sequencesHistory.length - 1];

        // convert the sequence to array for filter
        let getSq = this.processSteps(sq, []).find(e => e.step_id == lastState.step_id);
        logger.info(`getNextSequence :: Last seq state - ${JSON.stringify(getSq)}`);
        let triggered = true;
        if (getSq.triggerType) {
            triggered = await this.crawling.getEventStatus(getSq.triggerType, lead.lead_url);
            // await this.crawling.sendRequest()
        }
        if (lastState.status == 'SUCCESS' && triggered) {
            if (getSq && getSq.yes && getSq.yes.delay) {
                if (this.isReachedDelay(lastState.excuted_at, getSq.yes.delay)) {
                    logger.info(`${getSq.type} Yes Delay reached`);
                    return getSq.yes;
                } else {
                    logger.info(`${getSq.type} Yes Delay not reached`);
                    return null;
                }

            }
            return getSq.yes;
        }
        if (lastState.status == 'FAILED' || !triggered) {
            if (sq && sq.no && sq.no.delay) {
                if (this.isReachedDelay(lastState.excuted_at, sq.no.delay)) {
                    logger.info(`${getSq.type} no Delay reached`);
                    return getSq.no;
                } else {
                    logger.info(`${getSq.type} no Delay not reached`);
                    return null;
                }

            }
            return getSq.no;
        }

        return false;
    }
    /**
     * pluck steps for handiling
     * 
     */
    processSteps(steps, stepIds) {
        if (steps && steps.step_id) {
            let tt = {
                "step_id": steps.step_id,
                "triggerType": this.getEventTriggerType(steps.type),
                "yes": steps.yes,
                "no": steps.no,
                "type": steps.type
            }
            if (steps.yes && steps.yes.step_id) {
                this.processSteps(steps.yes, stepIds);
            }
            if (steps.no && steps.no.step_id) {
                this.processSteps(steps.no, stepIds);
            }
            stepIds.push(tt);
        }
        return stepIds;
    }

    getEventTriggerType(type) {
        let event;
        switch (type) {
            case "CONNECT":
                event = "INVITE_ACCEPTED"
                break;
            case "MESSAGE":
                event = "MESSAGE_RESPONDED"
                break;
            default:
                break;
        }
        return event;
    }
    isReachedDelay(excutedAt, delay) {
        let delaytime = moment(excutedAt).add(delay.value, delay.timeUnit).format('YYYY-MM-DD HH:mm:ss');
        let currentTime = moment().utc().format('YYYY-MM-DD HH:mm:ss');
        let is_reachecd = moment(currentTime, 'YYYY-MM-DD HH:mm:ss').isSameOrAfter(delaytime);
        logger.info(`currentTime - ${currentTime}`);
        logger.info(`excutedAt - ${excutedAt}`);
        logger.info(`delaytime - ${delaytime}`);
        logger.info(`is_reachecd - ${is_reachecd}`);
        return is_reachecd;

        logger.info(is_reachecd);
    }
}

module.exports = {
    Campaign
};