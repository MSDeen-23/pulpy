package com.pulpy.templateservice.service;


import com.pulpy.sharedservices.constants.MessageConstants;
import com.pulpy.sharedservices.entity.template.Template;
import com.pulpy.sharedservices.entity.user.User;
import com.pulpy.sharedservices.exceptions.ExceptionMessages;
import com.pulpy.sharedservices.exceptions.customexceptions.NotFoundException;
import com.pulpy.templateservice.feign.UserFeignService;
import com.pulpy.templateservice.repository.TemplateRepository;
import com.pulpy.templateservice.utils.Utils;
import com.pulpy.templateservice.vo.SaveTemplateResponse;
import com.pulpy.templateservice.vo.TemplateRequestBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
public class TemplateService {

    @Autowired
    TemplateRepository templateRepository;

    @Autowired
    UserFeignService userFeign;

    @Autowired
    Utils utils;
    public ResponseEntity<SaveTemplateResponse> saveTemplate(TemplateRequestBody templateRequestBody) throws IOException {
        String templateStepData = utils.generateStepData(templateRequestBody.getTemplateStepData());
        String stepDataPath = utils.writeToFile(templateRequestBody.getTemplateStepData(),"TemplateStepData.json");
        String structurePath = utils.writeToFile(templateStepData,"TemplateStructureData.json");
        Template template = Template.builder()
                .templateName(templateRequestBody.getTemplateName())
                .templateStepsPath(stepDataPath)
                .templateStructurePath(structurePath)
                .createdBy(templateRequestBody.getCreatedBy())
                .build();
        Template savedTemplates = templateRepository.save(template);
        SaveTemplateResponse saveTemplateResponse = SaveTemplateResponse.builder()
                .templateId(savedTemplates.getId())
                .message(MessageConstants.TEMPLATES_SAVED_SUCCESSFULLY)
                .templateName(savedTemplates.getTemplateName())
                .build();
        return ResponseEntity.ok().body(saveTemplateResponse);
    }

    public Template getTemplateById(UUID id) {
        Template template = templateRepository.findById(id).get();
        return template;

    }

    public List<Template> getTemplatesByUserId(UUID createdBy) {
        List<Template> templates = templateRepository.getTemplateByCreatedBy(createdBy);
        return templates;
    }

//    public List<Campaign> getCampaignsBetweenTimeStamp(String startTime, String endTime) throws ParseException {
//        Date startDate = DateUtils.convertStringToDate(startTime);
//        Date endDate = DateUtils.convertStringToDate(endTime);
//        return templateRepository.findByScheduledDateTimeBetweenOrderByScheduledDateTimeAsc(startDate,endDate);
//    }
}
