package com.pulpy.templateservice.feign;

import com.pulpy.sharedservices.entity.user.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.UUID;

import static com.pulpy.sharedservices.constants.ServiceConstants.USER_SERVICE;

@FeignClient(name="USER-SERVICE")
public interface UserFeignService {
    @RequestMapping(method = RequestMethod.GET, value = USER_SERVICE+"{id}", produces = "application/json")
    User getUserById(@PathVariable("id") UUID id);
}
