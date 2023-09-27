package com.pulpy.userservice.controller;

import com.fasterxml.jackson.annotation.JsonView;
import com.pulpy.sharedservices.entity.View;
import com.pulpy.sharedservices.entity.user.User;
import com.pulpy.sharedservices.entity.user.UserCredentials;
import com.pulpy.sharedservices.entity.user.UserVerification;
import com.pulpy.sharedservices.utils.CommonUtils;
import com.pulpy.userservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    @JsonView(View.Public.class)
    public User saveUser(@RequestBody User user){
        return userService.saveUser(user);
    }


    @PostMapping("/verify-user")
    public ResponseEntity<?> verifyUser(@RequestBody UserVerification userVerification){
        return userService.verifyUser(userVerification);

    }

    @PostMapping("/resend-otp/{userId}")
    public ResponseEntity<?> resendOtp(@PathVariable UUID userId){
        return userService.resendOtp(userId);
    }

    @PutMapping("/credentials")
    public ResponseEntity<?> saveCredentials(@RequestHeader Map<String,String> header, @RequestBody UserCredentials userCredentials){
        UUID createdBy = CommonUtils.getUserIdFromHeaderAsUUID(header);
        return userService.updateUserWithCreds(createdBy,userCredentials);
    }

    @GetMapping("/{userId}")
    @JsonView(View.Internal.class)
    public User getUserById(@PathVariable UUID userId){
        return userService.getUserById(userId);
    }

    @GetMapping("/")
    @JsonView(View.Internal.class)
    @ResponseBody
    public User getUserByUserName(@RequestParam String username) {
        return userService.getUserByUserName(username);
    }
}
