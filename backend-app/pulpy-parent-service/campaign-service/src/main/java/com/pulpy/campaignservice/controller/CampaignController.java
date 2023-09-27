package com.pulpy.campaignservice.controller;

import com.pulpy.campaignservice.service.CampaignService;
import com.pulpy.campaignservice.vo.SavedCampaignResponse;
import com.pulpy.sharedservices.constants.MessageConstants;
import com.pulpy.sharedservices.entity.campaign.Campaign;
import com.pulpy.sharedservices.entity.sharedentities.CampaignResponse;
import com.pulpy.sharedservices.exceptions.ErrorResponse;
import com.pulpy.sharedservices.exceptions.ExceptionMessages;
import com.pulpy.sharedservices.exceptions.customexceptions.CreateFailedException;
import com.pulpy.sharedservices.utils.CommonUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.RequestContext;

import java.text.MessageFormat;
import java.text.ParseException;
import java.util.List;
import java.util.Map;
import java.util.TimeZone;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/campaign")
@Slf4j
public class CampaignController
{
    @Autowired
    private CampaignService campaignService;

    @PostMapping(value = "")
    public ResponseEntity<SavedCampaignResponse> saveCampaign(@RequestHeader Map<String, String> headers, @RequestBody Campaign campaign) throws Exception {
        try {
            UUID createdBy = CommonUtils.getUserIdFromHeaderAsUUID(headers);
            return campaignService.saveCampaign(createdBy, campaign);
        }
        catch (Exception e){
            throw new CreateFailedException(MessageFormat.format(ExceptionMessages.CREATION_FAILED_EXCEPTION,"Campaign"));
        }
    }



    @GetMapping(value = "/{id}")
    public CampaignResponse getCampaignWithUser(@PathVariable  UUID id) throws Exception {
        try {
            return campaignService.getCampaign(id);
        }
        catch (Exception exception)
        {
            throw new Exception(exception);
        }
    }

    @GetMapping(value = "/")
    public List<CampaignResponse> getCampaignsBetweenTimeStamp(@RequestParam String startTime,@RequestParam String endTime) throws ParseException {
        return campaignService.getCampaignsBetweenTimeStamp(startTime,endTime);
    }
}
