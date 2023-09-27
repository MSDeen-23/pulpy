package com.pulpy.sharedservices.entity.template;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.pulpy.sharedservices.entity.BaseEntity;
import lombok.*;

import javax.persistence.Entity;
import java.util.UUID;

@Entity
@ToString
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Template extends BaseEntity {
    private String templateName;

    private String templateStepsPath;

    private String templateStructurePath;

    private UUID createdBy;
}
