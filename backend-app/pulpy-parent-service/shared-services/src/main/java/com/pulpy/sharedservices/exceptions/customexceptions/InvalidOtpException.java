package com.pulpy.sharedservices.exceptions.customexceptions;

public class InvalidOtpException extends RuntimeException{
    public InvalidOtpException(String message) {
        super(message);
    }
}
