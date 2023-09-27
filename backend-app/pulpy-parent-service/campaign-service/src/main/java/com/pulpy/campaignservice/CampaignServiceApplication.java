package com.pulpy.campaignservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableEurekaClient
@EntityScan("com.pulpy.sharedservices.entity.campaign")
@EnableFeignClients
public class CampaignServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(CampaignServiceApplication.class, args);
    }
}
