package com.pulpy.templateservice.vo;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@Builder
public class SaveTemplateResponse {
    private UUID templateId;
    private String templateName;
    private String message;
}
