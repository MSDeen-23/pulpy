package com.pulpy.leadsservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.openfeign.EnableFeignClients;

import javax.persistence.Entity;

@SpringBootApplication
@EnableEurekaClient
@EnableFeignClients
@EntityScan("com.pulpy.sharedservices.entity.leads")
public class LeadsServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(LeadsServiceApplication.class, args);
    }

}
