package com.pulpy.campaignservice.feign;

import com.pulpy.sharedservices.entity.sharedentities.LeadsUser;
import com.pulpy.sharedservices.entity.user.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import java.util.UUID;
import static com.pulpy.sharedservices.constants.ServiceConstants.LEADS_SERVICE;


@FeignClient(name = "LEADS-SERVICE")
public interface LeadsListFeignService {
    @RequestMapping(method = RequestMethod.GET, value = LEADS_SERVICE+"{id}", produces = "application/json")
    LeadsUser getLeadsById(@PathVariable("id") UUID id);
}
