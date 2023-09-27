package com.pulpy.sharedservices.entity.sharedentities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RunCampaign {
    private String topic_type;
    private TopicData topic_data;
}
