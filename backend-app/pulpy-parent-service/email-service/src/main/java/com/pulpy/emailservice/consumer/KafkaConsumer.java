package com.pulpy.emailservice.consumer;

import com.google.gson.Gson;
import com.pulpy.emailservice.service.EmailService;
import com.pulpy.sharedservices.models.EmailModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class KafkaConsumer {
    @Autowired
    Gson gson;

    @Autowired
    EmailService emailService;

    @KafkaListener(topics = {"pulpy-new-user"},groupId = "pulpy")
    public void consume(String message)  {
        try {
            EmailModel emailModel = gson.fromJson(message, EmailModel.class);
            System.out.println(emailModel);
            emailService.sendEmail(emailModel);
        }
        catch (Exception e){
            System.out.println(e);
        }
    }
}
