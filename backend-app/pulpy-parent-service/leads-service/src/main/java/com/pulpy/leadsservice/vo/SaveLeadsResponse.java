package com.pulpy.leadsservice.vo;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@Builder
public class SaveLeadsResponse{
    private UUID leadsId;
    private String message;
    private String leadsListName;
}
