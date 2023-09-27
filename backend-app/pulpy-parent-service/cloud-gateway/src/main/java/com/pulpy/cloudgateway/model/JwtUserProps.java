package com.pulpy.cloudgateway.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class JwtUserProps {
    private String username;
    private String tenantId;
    private String roleId;
}
