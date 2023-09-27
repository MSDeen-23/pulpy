package com.pulpy.leadsservice.controller;

import com.pulpy.leadsservice.service.LeadsService;
import com.pulpy.leadsservice.vo.SaveLeadsResponse;
import com.pulpy.sharedservices.constants.MessageConstants;
import com.pulpy.sharedservices.entity.leads.Leads;
import com.pulpy.sharedservices.entity.sharedentities.LeadsUser;
import com.pulpy.sharedservices.utils.CommonUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/leads")
public class LeadsController {
    @Autowired
    private LeadsService leadsService;

    @GetMapping("/{id}")
    public LeadsUser getLeadsById(@PathVariable UUID id){
        return leadsService.getLeadsById(id);
    }

    @GetMapping("")
    public ResponseEntity<List<Leads>> getLeads(@RequestHeader Map<String,String> header){
        UUID createdBy = CommonUtils.getUserIdFromHeaderAsUUID(header);
        List<Leads> leadsList = leadsService.getLeads(createdBy);
        return ResponseEntity.ok().body(leadsList);
    }

    @PostMapping("")
    public ResponseEntity<SaveLeadsResponse> saveLeads(@RequestHeader Map<String,String> header, @RequestBody Leads leads){
        UUID createdBy = CommonUtils.getUserIdFromHeaderAsUUID(header);
        leads.setCreatedBy(createdBy);
        return leadsService.saveLeads(leads);
    }

}
