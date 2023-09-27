package com.pulpy.sharedservices.entity;

import com.fasterxml.jackson.annotation.JsonView;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.UUID;

@MappedSuperclass
@Getter
@Setter
public abstract class BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @org.hibernate.annotations.Type(type="org.hibernate.type.PostgresUUIDType")
    @JsonView(View.Public.class)
    private UUID id;

    @CreationTimestamp
    @JsonView(View.Internal.class)
    private Timestamp createdTime;

    @UpdateTimestamp
    @JsonView(View.Internal.class)
    private Timestamp lastModifiedTime;

    @Column(nullable = true , name = "isDeleted")
    @JsonView(View.Internal.class)
    private boolean isDeleted;

}
