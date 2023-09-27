package com.pulpy.sharedservices.models;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class EmailModel {
    private String to;
    private String subject;
    private String message;


}
