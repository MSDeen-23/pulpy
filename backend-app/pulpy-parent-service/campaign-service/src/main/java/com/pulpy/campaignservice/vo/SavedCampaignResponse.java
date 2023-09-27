package com.pulpy.campaignservice.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SavedCampaignResponse {
    private UUID campaignId;
    private String campaignName;
    private String message;
}
