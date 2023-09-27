package com.pulpy.cloudgateway;

import org.springframework.web.bind.annotation.GetMapping;

public class FallBackMethodController {

    @GetMapping("/userServiceFallBack")
    public String userServiceFallBackMethod(){
        return "User service is not responding. Please try again later";
    }

    @GetMapping("/campaignServiceFallBack")
    public String campaignServiceFallBackMethod(){
        return "User service is not responding. Please try again later";
    }

}
