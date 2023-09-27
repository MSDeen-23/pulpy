package com.pulpy.schedulerservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

import java.util.Calendar;

@SpringBootApplication
@EnableScheduling
@EntityScan("com.pulpy.sharedservices.entity.campaign")
@EnableFeignClients
public class SchedulerServiceApplication {

    public static void main(String[] args) {    
        SpringApplication.run(SchedulerServiceApplication.class, args);
    }


}

