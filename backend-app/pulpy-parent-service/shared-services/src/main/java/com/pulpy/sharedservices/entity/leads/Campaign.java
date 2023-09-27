package com.pulpy.sharedservices.entity.leads;


import com.pulpy.sharedservices.entity.BaseEntity;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.sql.Time;
import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@ToString
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Campaign extends BaseEntity {

    private String leadsName;
    @ElementCollection
    private List<String> leads;
    private String templateName;
    private String templateData;
    private String templateStepData;
    private String campaignName;

    @CreationTimestamp
    private Timestamp scheduledDateTime;
    private String linkedInUserName;
    private String linkedInPassword;
    private UUID createdBy;

}
