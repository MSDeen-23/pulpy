package com.pulpy.sharedservices.entity.leads;

import com.pulpy.sharedservices.entity.BaseEntity;
import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.List;
import java.util.UUID;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "leads")
public class Leads extends BaseEntity {
    @NotNull
    private String leadsListName;

    @ElementCollection
    @NotNull
    private List<String> listOfLeads;

    @org.hibernate.annotations.Type(type="org.hibernate.type.PostgresUUIDType")
    private UUID createdBy;


}
