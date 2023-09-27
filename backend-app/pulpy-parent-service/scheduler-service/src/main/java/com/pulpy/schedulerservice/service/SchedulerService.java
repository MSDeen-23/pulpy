package com.pulpy.schedulerservice.service;

import com.google.gson.JsonObject;
import com.pulpy.schedulerservice.feign.CampaignFeignService;
import com.pulpy.schedulerservice.kafka.KafkaProduceMessage;
import com.pulpy.schedulerservice.repository.CampaignRepository;
import com.pulpy.sharedservices.entity.sharedentities.CampaignResponse;
import com.pulpy.sharedservices.entity.sharedentities.RunCampaign;
import com.pulpy.sharedservices.entity.sharedentities.TopicData;
import com.pulpy.sharedservices.entity.sharedentities.RunLead;
import com.pulpy.sharedservices.utils.DateUtils;
import com.pulpy.sharedservices.utils.FileUtils;
import com.pulpy.sharedservices.utils.JSONUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.io.FileNotFoundException;
import java.text.ParseException;
import java.util.*;

@Service
public class SchedulerService {
    @Autowired
    private CampaignRepository campaignRepository;

    @Autowired
    private CampaignFeignService campaignFeignService;

    private List<CampaignResponse> alreadyRun = new ArrayList<>();

    @Autowired
    private KafkaProduceMessage kafkaProduceMessage;




    @Scheduled(fixedRate=60*60*3600)
    public void run() throws ParseException, FileNotFoundException{
        String sDate1= DateUtils.getCurrentDate().toInstant().toString();
        String sDate2=DateUtils.getCurrentDate().toInstant().plusSeconds(3600).toString() ;
        List<CampaignResponse> campaigns = campaignFeignService.getCampaignBetweenTimeStamp(sDate1,sDate2);
        campaigns.stream().forEach(campaign->{
            String username = "NISHA123";

            TopicData topicData = new TopicData();
            List<RunLead> leads = new ArrayList<>();
            topicData.setCampaignId(campaign.getCampaign().getId());
            topicData.setInitialStartDateTime(campaign.getCampaign().getScheduledDateTime());
            topicData.setExecutionId(UUID.randomUUID());

            campaign.getLeads().getListOfLeads().stream().forEach(singleLead->{
                String id = singleLead.substring(singleLead.lastIndexOf('/') + 1);
                RunLead runLead = RunLead.builder()
                        .lead_id(singleLead)
                        .lead_url(singleLead)
                        .build();
                leads.add(runLead);
            });
            topicData.setLeads(leads);
            String runStructurePath = campaign.getTemplate().getTemplateStructurePath();
            try {
                JsonObject stepsObject = JSONUtils.convertStringAsJson(FileUtils.readFromFileAsString(runStructurePath));
                topicData.setSteps(stepsObject);

            } catch (FileNotFoundException e) {
                e.printStackTrace();
            }
            RunCampaign runCampaign = new RunCampaign();
            runCampaign.setTopic_type("CAMPAIGN");
            runCampaign.setTopic_data(topicData);
            String payloadToSend = JSONUtils.jsonObjectToString(runCampaign);
            System.out.println(username);
            System.out.println(payloadToSend);
            kafkaProduceMessage.sendMessage(username,payloadToSend);
        });
        campaigns.stream().forEach(System.out::println);
    }
}
