package com.pulpy.campaignservice.service;

import com.pulpy.campaignservice.feign.LeadsListFeignService;
import com.pulpy.campaignservice.feign.TemplateFeignService;
import com.pulpy.campaignservice.feign.UserFeignService;
import com.pulpy.campaignservice.repository.CampaignRepository;
import com.pulpy.campaignservice.vo.SavedCampaignResponse;
import com.pulpy.sharedservices.constants.MessageConstants;
import com.pulpy.sharedservices.entity.campaign.Campaign;
import com.pulpy.sharedservices.entity.sharedentities.CampaignResponse;
import com.pulpy.sharedservices.entity.sharedentities.LeadsUser;
import com.pulpy.sharedservices.entity.template.Template;
import com.pulpy.sharedservices.entity.user.User;
import com.pulpy.sharedservices.utils.DateUtils;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

@Service
public class CampaignService {

    @Autowired
    private CampaignRepository campaignRepository;

    @Autowired
    private UserFeignService userFeignService;

    @Autowired
    private LeadsListFeignService leadsListFeignService;

    @Autowired
    private TemplateFeignService templateFeignService;


    public ResponseEntity<SavedCampaignResponse> saveCampaign(UUID createdBy, Campaign campaign) throws Exception {
        try {

            campaign.setCreatedBy(createdBy);
            Campaign savedCampaign =  campaignRepository.save(campaign);
            SavedCampaignResponse savedCampaignResponse = SavedCampaignResponse.builder()
                    .campaignId(savedCampaign.getId())
                    .campaignName(savedCampaign.getCampaignName())
                    .message(MessageConstants.CAMPAIGN_SAVED_SUCCESSFULLY)
                    .build();
            return ResponseEntity.ok().body(savedCampaignResponse);

        }
        catch (Exception e){
            throw new Exception();
        }
    }


    public CampaignResponse getCampaign(UUID id) throws ExecutionException, InterruptedException {
        Campaign campaign = campaignRepository.findById(id).get();
        CampaignResponse campaignResponse = getCampaignResponseFromCampaign(campaign);
        return campaignResponse;

    }

    public List<CampaignResponse> getCampaignsBetweenTimeStamp(String startTime, String endTime) throws ParseException{
        Date startDate = DateUtils.convertStringToDate(startTime);
        Date endDate = DateUtils.convertStringToDate(endTime);
        List<Campaign> campaigns = campaignRepository.findByScheduledDateTimeBetweenOrderByScheduledDateTimeAsc(startDate,endDate);
        List<CampaignResponse> campaignResponses = campaigns.stream().
                map(campaign -> {
                    try {
                        return getCampaignResponseFromCampaign(campaign);
                    } catch (Exception e) {
                        return null;
                    }
                }).collect(Collectors.toList());
        return campaignResponses;
    }

    private CampaignResponse getCampaignResponseFromCampaign(Campaign campaign) throws ExecutionException, InterruptedException {
        CompletableFuture<User> userCompletableFuture = CompletableFuture.supplyAsync(()->
                userFeignService.getUserById(campaign.getCreatedBy()));
        CompletableFuture<LeadsUser> leadsUserCompletableFuture = CompletableFuture.supplyAsync(()->
                leadsListFeignService.getLeadsById(campaign.getLeadsListId()));
        CompletableFuture<Template> templatesCompletableFuture = CompletableFuture.supplyAsync(()->
                templateFeignService.getTemplateById(campaign.getTemplateId()));
        CompletableFuture<Void> combinedFuture
                = CompletableFuture.allOf(userCompletableFuture, leadsUserCompletableFuture,templatesCompletableFuture);
        combinedFuture.get();
        CampaignResponse campaignResponse = CampaignResponse.builder()
                .campaign(campaign)
                .leads(leadsUserCompletableFuture.get().leads())
                .template(templatesCompletableFuture.get())
                .user(userCompletableFuture.get())
                .build();
        return campaignResponse;
    }
}
