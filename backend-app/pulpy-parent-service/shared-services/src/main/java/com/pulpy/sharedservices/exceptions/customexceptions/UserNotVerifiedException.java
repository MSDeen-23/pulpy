package com.pulpy.sharedservices.exceptions.customexceptions;

public class UserNotVerifiedException extends RuntimeException{
    public UserNotVerifiedException(String message) {
        super(message);
    }
}
