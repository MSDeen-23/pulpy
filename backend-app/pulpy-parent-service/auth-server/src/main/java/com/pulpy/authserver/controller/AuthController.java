package com.pulpy.authserver.controller;

import com.pulpy.authserver.model.JwtRequest;
import com.pulpy.authserver.model.JwtResponse;
import com.pulpy.authserver.service.UserService;
import com.pulpy.authserver.utility.JWTUtility;
import com.pulpy.sharedservices.entity.user.User;
import com.pulpy.sharedservices.exceptions.ExceptionMessages;
import com.pulpy.sharedservices.exceptions.customexceptions.InvalidPasswordException;
import com.pulpy.sharedservices.exceptions.customexceptions.UserNotFoundException;
import com.pulpy.sharedservices.exceptions.customexceptions.UserNotVerifiedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/oauth")
public class AuthController {

    @Autowired
    private JWTUtility jwtUtility;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    private UserService userService;



    @PostMapping("/authenticate")
    public JwtResponse authenticate(@RequestBody JwtRequest jwtRequest){
            final User user = userService.loadUser(jwtRequest.getUsername());
            if (user == null || user.isDeleted()) {
                throw new UserNotFoundException(ExceptionMessages.USER_NOT_FOUND);
            }
            if(!user.getIsVerified()){
                throw new UserNotVerifiedException(ExceptionMessages.USER_NOT_VERIFIED);
            }
            boolean isPasswordMatched = passwordEncoder.matches(jwtRequest.getPassword(), user.getPassword());
            if (isPasswordMatched) {
                final UserDetails userDetails = userService.loadUserByUsername(jwtRequest.getUsername());
                final String token = jwtUtility.generateToken(userDetails, user);
                return new JwtResponse(token);
            } else {
                throw new InvalidPasswordException(ExceptionMessages.INVALID_PASSWORD);
            }


    }

}
