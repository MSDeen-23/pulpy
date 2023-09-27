package com.pulpy.schedulerservice.feign;

import com.pulpy.sharedservices.entity.campaign.Campaign;
import com.pulpy.sharedservices.entity.sharedentities.CampaignResponse;
import com.pulpy.sharedservices.entity.user.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@FeignClient(name = "CAMPAIGN-SERVICE")
public interface CampaignFeignService {
    @RequestMapping(method = RequestMethod.GET, value = "/api/v1/campaign/", produces = "application/json")
    List<CampaignResponse> getCampaignBetweenTimeStamp(@RequestParam String startTime, @RequestParam String endTime);

}
