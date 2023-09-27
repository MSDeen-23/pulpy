package com.pulpy.templateservice.repository;

import com.pulpy.sharedservices.entity.template.Template;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface TemplateRepository extends JpaRepository<Template, UUID> {

    List<Template> getTemplateByCreatedBy(UUID createdBy);

}
