package com.pulpy.sharedservices.entity.sharedentities;

import com.pulpy.sharedservices.entity.campaign.Campaign;
import com.pulpy.sharedservices.entity.leads.Leads;
import com.pulpy.sharedservices.entity.template.Template;
import com.pulpy.sharedservices.entity.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CampaignResponse{
    private Campaign campaign;
    private User user;
    private Leads leads;
    private Template template;
}

