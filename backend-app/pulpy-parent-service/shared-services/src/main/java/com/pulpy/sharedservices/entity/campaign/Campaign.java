package com.pulpy.sharedservices.entity.campaign;

import com.pulpy.sharedservices.entity.BaseEntity;
import lombok.*;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Date;
import java.util.TimeZone;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "campaign")
public class Campaign extends BaseEntity {
    private String campaignName;

    @org.hibernate.annotations.Type(type="org.hibernate.type.PostgresUUIDType")
    private UUID leadsListId;

    @org.hibernate.annotations.Type(type="org.hibernate.type.PostgresUUIDType")
    private UUID templateId;

    @org.hibernate.annotations.Type(type="org.hibernate.type.PostgresUUIDType")
    private UUID createdBy;

    @Temporal(TemporalType.TIMESTAMP)
    private Date scheduledDateTime;





}
