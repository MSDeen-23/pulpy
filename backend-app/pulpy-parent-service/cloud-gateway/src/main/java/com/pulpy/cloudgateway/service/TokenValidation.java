package com.pulpy.cloudgateway.service;

import com.pulpy.cloudgateway.utility.JWTUtility;
import com.pulpy.sharedservices.exceptions.customexceptions.TokenNotValidException;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

@Service
public class TokenValidation {
    @Autowired
    private JWTUtility jwtUtility;

    public Claims validateToken(String token){

            token = token.replace("Bearer ", "");
            final String username = jwtUtility.getUsernameFromToken(token);
            boolean isValidToken = jwtUtility.validateToken(token);
            Claims claims = jwtUtility.getAllClaimsFromToken(token);
            if (isValidToken) {
                return claims;
            } else {
                throw new TokenNotValidException("Invalid token");
            }




    }
}
