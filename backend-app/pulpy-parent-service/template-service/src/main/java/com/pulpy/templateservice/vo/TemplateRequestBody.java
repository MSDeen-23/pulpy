package com.pulpy.templateservice.vo;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class TemplateRequestBody  {
    private String templateName;

    private String templateStepData;

    private UUID createdBy;


}
