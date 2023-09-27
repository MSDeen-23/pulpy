package com.pulpy.sharedservices.exceptions.customexceptions;

public class UserExistsButNotVerifiedException extends RuntimeException{
    public UserExistsButNotVerifiedException(String message){
        super(message);
    }
}
