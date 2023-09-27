package com.pulpy.sharedservices.entity.sharedentities;

import com.google.gson.JsonObject;
import lombok.*;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class TopicData {
    private UUID campaignId;
    private Date initialStartDateTime;
    private UUID executionId;
    private List<RunLead> leads;
    private JsonObject steps;
}
