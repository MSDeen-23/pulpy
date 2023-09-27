package com.pulpy.sharedservices.entity.user;
import com.fasterxml.jackson.annotation.JsonView;
import com.pulpy.sharedservices.entity.BaseEntity;
import com.pulpy.sharedservices.entity.View;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "users")
public class User extends BaseEntity {

    @JsonView(View.Public.class)
    private String firstName;

    @JsonView(View.Public.class)
    private String lastName;

    @Column(unique=true)
    @JsonView(View.Public.class)
    private String email;


    @JsonView(View.Internal.class)
    private String password;

    @Column(length = 6)
    @JsonView(View.Internal.class)
    private String emailOtp;

    @JsonView(View.Internal.class)
    private Date otpEndTime;

    @JsonView(View.Internal.class)
    private Boolean isVerified;

    @Column(unique=true)
    @JsonView(View.Public.class)
    private String linkedInUsername;

    @JsonView(View.Internal.class)
    private String linkedInPassword;
}
