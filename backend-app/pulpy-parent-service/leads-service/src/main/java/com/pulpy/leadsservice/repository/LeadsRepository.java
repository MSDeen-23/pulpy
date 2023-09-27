package com.pulpy.leadsservice.repository;

import com.pulpy.sharedservices.entity.leads.Leads;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface LeadsRepository extends JpaRepository<Leads, UUID> {
    public List<Leads> getLeadsByCreatedBy(UUID createdBy);
    public Leads getLeadsByCreatedByAndLeadsListName(UUID createdBy,String leadsListName);
}
