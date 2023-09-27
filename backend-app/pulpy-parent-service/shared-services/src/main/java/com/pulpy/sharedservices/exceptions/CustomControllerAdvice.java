package com.pulpy.sharedservices.exceptions;

import com.pulpy.sharedservices.exceptions.customexceptions.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class CustomControllerAdvice {
    @ExceptionHandler(NullPointerException.class)
    public ResponseEntity<ErrorResponse> handleNullPointerExceptions(Exception e){
        HttpStatus status = HttpStatus.NOT_FOUND;
        return new ResponseEntity<>(new ErrorResponse(status,e.getMessage()),status);
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleUserNotFoundException(UserNotFoundException e){
        HttpStatus status = HttpStatus.NOT_FOUND;
        return new ResponseEntity<>(new ErrorResponse(status,e.getMessage()),status);
    }

    @ExceptionHandler(InvalidPasswordException.class)
    public ResponseEntity<ErrorResponse> handleInvalidPasswordException(RuntimeException e){
        HttpStatus status = HttpStatus.BAD_REQUEST;
        return new ResponseEntity<>(new ErrorResponse(status,e.getMessage()),status);
    }

    @ExceptionHandler(UserNotVerifiedException.class)
    public ResponseEntity<ErrorResponse> handleUserNotVerifiedException(RuntimeException e){
        HttpStatus status = HttpStatus.FORBIDDEN;
        return new ResponseEntity<>(new ErrorResponse(status,e.getMessage()),status);
    }

    @ExceptionHandler(InvalidOtpException.class)
    public ResponseEntity<ErrorResponse> handleInvalidOtpException(InvalidOtpException e){
        HttpStatus status = HttpStatus.BAD_REQUEST;
        return new ResponseEntity<>(new ErrorResponse(status,e.getMessage()),status);
    }

    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<ErrorResponse> handleUserAlreadyExistsException(UserAlreadyExistsException e){
        HttpStatus status = HttpStatus.BAD_REQUEST;
        return new ResponseEntity<>(new ErrorResponse(status,e.getMessage()),status);
    }

    @ExceptionHandler(CreateFailedException.class)
    public ResponseEntity<ErrorResponse> handleCreateFailedException(CreateFailedException e){
        HttpStatus status = HttpStatus.BAD_REQUEST;
        return new ResponseEntity<>(new ErrorResponse(status,e.getMessage()),status);
    }

    @ExceptionHandler(TokenNotValidException.class)
    public ResponseEntity<ErrorResponse> handleTokenNotValidException(TokenNotValidException e){
        HttpStatus status = HttpStatus.UNAUTHORIZED;
        return new ResponseEntity<>(new ErrorResponse(status,e.getMessage()),status);
    }

    @ExceptionHandler(UserExistsButNotVerifiedException.class)
    public ResponseEntity<ErrorResponse> handleUserExistsButNotVerifiedExceptionException(UserExistsButNotVerifiedException e){
        HttpStatus status = HttpStatus.UNAVAILABLE_FOR_LEGAL_REASONS;
        return new ResponseEntity<>(new ErrorResponse(status,e.getMessage()),status);
    }

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFoundException(NotFoundException e){
        HttpStatus status = HttpStatus.NOT_FOUND;
        return new ResponseEntity<>(new ErrorResponse(status,e.getMessage()),status);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleExceptions(Exception e) {
        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
        String message = "Looks like something went wrong.Please try again later";

        return new ResponseEntity<>(
                new ErrorResponse(
                        status,
                        message
                ),
                status
        );
    }


}
