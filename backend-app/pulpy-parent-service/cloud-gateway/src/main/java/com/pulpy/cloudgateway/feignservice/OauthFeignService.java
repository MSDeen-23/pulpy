package com.pulpy.cloudgateway.feignservice;

import com.pulpy.cloudgateway.model.JwtUserProps;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@FeignClient(name = "OAUTH-SERVICE")
public interface OauthFeignService {

    @RequestMapping(method = RequestMethod.GET, value = "/api/v1/oauth/validate-token")
    JwtUserProps validateToken(@RequestHeader("Authorization") String token);
}
