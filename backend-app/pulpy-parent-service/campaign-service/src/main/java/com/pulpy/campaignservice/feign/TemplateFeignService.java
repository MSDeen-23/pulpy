package com.pulpy.campaignservice.feign;

import com.pulpy.sharedservices.entity.sharedentities.LeadsUser;
import com.pulpy.sharedservices.entity.template.Template;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.UUID;

import static com.pulpy.sharedservices.constants.ServiceConstants.TEMPLATES_SERVICE;

@FeignClient(name = "TEMPLATE-SERVICE")
public interface TemplateFeignService {
    @RequestMapping(method = RequestMethod.GET, value = TEMPLATES_SERVICE+"{id}", produces = "application/json")
    Template getTemplateById(@PathVariable("id") UUID id);
}
