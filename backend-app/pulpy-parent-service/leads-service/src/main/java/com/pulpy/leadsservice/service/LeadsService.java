package com.pulpy.leadsservice.service;

import com.pulpy.leadsservice.feign.UserFeign;
import com.pulpy.leadsservice.repository.LeadsRepository;
import com.pulpy.leadsservice.vo.SaveLeadsResponse;
import com.pulpy.sharedservices.constants.MessageConstants;
import com.pulpy.sharedservices.entity.leads.Leads;
import com.pulpy.sharedservices.entity.sharedentities.LeadsUser;
import com.pulpy.sharedservices.entity.user.User;
import com.pulpy.sharedservices.exceptions.customexceptions.CreateFailedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class LeadsService {

    @Autowired
    private LeadsRepository leadsRepository;

    @Autowired
    private UserFeign userFeign;

    public ResponseEntity<SaveLeadsResponse> saveLeads(Leads leads){
        Leads alreadyExistingLead = leadsRepository.getLeadsByCreatedByAndLeadsListName(leads.getCreatedBy(),leads.getLeadsListName());
        if(alreadyExistingLead==null) {
            Leads savedLeads = leadsRepository.save(leads);
            SaveLeadsResponse saveLeadsResponse = SaveLeadsResponse.builder()
                    .leadsId(savedLeads.getId())
                    .leadsListName(savedLeads.getLeadsListName())
                    .message(MessageConstants.LEADS_SAVED_SUCCESSFULLY)
                    .build();
            return ResponseEntity.ok().body(saveLeadsResponse);
        }
        else{
            throw new CreateFailedException("Lead with the same name already exists");
        }

    }

    public LeadsUser getLeadsById(UUID id){
        Leads leads = leadsRepository.findById(id).get();
        User user = userFeign.getUserById(leads.getCreatedBy());

        return new LeadsUser(leads,user);
    }

    public List<Leads> getLeads(UUID createdBy){
        List<Leads> leads = leadsRepository.getLeadsByCreatedBy(createdBy);
        return leads;

    }
}
