package com.pulpy.sharedservices.entity.sharedentities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RunLead {
    private String lead_id;
    private String lead_url;
}
