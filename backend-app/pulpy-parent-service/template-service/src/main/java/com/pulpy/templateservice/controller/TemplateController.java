package com.pulpy.templateservice.controller;


import com.pulpy.sharedservices.entity.template.Template;
import com.pulpy.sharedservices.utils.CommonUtils;
import com.pulpy.templateservice.service.TemplateService;
import com.pulpy.templateservice.vo.SaveTemplateResponse;
import com.pulpy.templateservice.vo.TemplateRequestBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/template")
public class TemplateController {

    @Autowired
    private TemplateService templateService;


    @GetMapping("/{id}")
    public Template getTemplateById(@PathVariable UUID id){
        return templateService.getTemplateById(id);
    }

    @GetMapping("")
    public ResponseEntity<List<Template>> getTemplates(@RequestHeader Map<String,String> header){
        UUID createdBy = CommonUtils.getUserIdFromHeaderAsUUID(header);
        List<Template> templateList = templateService.getTemplatesByUserId(createdBy);
        return ResponseEntity.ok().body(templateList);
    }

    @RequestMapping(value = "", method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SaveTemplateResponse> saveTemplate(@RequestHeader Map<String,String> header,
                                                             @RequestBody TemplateRequestBody templateRequestBody) throws IOException {
        UUID createdBy = CommonUtils.getUserIdFromHeaderAsUUID(header);
        templateRequestBody.setCreatedBy(createdBy);
        return templateService.saveTemplate(templateRequestBody);
    }

}
