package com.pulpy.campaignservice.vo;

import com.pulpy.sharedservices.entity.campaign.Campaign;
import com.pulpy.sharedservices.entity.user.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponseTemplateVO {
    private Campaign campaign;
    private User user;
}
