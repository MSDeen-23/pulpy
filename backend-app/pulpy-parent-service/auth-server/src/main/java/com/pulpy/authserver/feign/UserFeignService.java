package com.pulpy.authserver.feign;

import com.pulpy.sharedservices.entity.user.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.UUID;

import static org.springframework.security.config.Elements.USER_SERVICE;

@FeignClient(name="USER-SERVICE")
public interface UserFeignService {
    @RequestMapping(method = RequestMethod.GET, value = "/api/v1/user/", produces = "application/json")
    User getUserByUserName(@RequestParam String username);
}
