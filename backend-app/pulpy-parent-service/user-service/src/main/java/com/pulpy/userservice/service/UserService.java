package com.pulpy.userservice.service;

import com.google.gson.Gson;
import com.pulpy.sharedservices.entity.user.User;
import com.pulpy.sharedservices.entity.user.UserCredentials;
import com.pulpy.sharedservices.entity.user.UserVerification;
import com.pulpy.sharedservices.exceptions.ExceptionMessages;
import com.pulpy.sharedservices.exceptions.customexceptions.InvalidOtpException;
import com.pulpy.sharedservices.exceptions.customexceptions.UserAlreadyExistsException;
import com.pulpy.sharedservices.exceptions.customexceptions.UserExistsButNotVerifiedException;
import com.pulpy.sharedservices.models.EmailModel;
import com.pulpy.sharedservices.utils.CommonUtils;
import com.pulpy.sharedservices.utils.DateUtils;
import com.pulpy.userservice.kafka.KafkaProduceMessage;
import com.pulpy.userservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Locale;
import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private KafkaProduceMessage produceMessage;

    @Autowired
    Gson gson;

    public User saveUser(User user) {
        user.setEmail(CommonUtils.convertToLowerCase(user.getEmail()));
        if(!userRepository.existsByEmail(user.getEmail())) {
            String otp = CommonUtils.generateOtp();
            user.setEmailOtp(otp);
            user.setOtpEndTime(DateUtils.getTimeAfterOneHour());
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            user.setIsVerified(false);
            EmailModel emailModel = EmailModel.builder()
                    .message("New user " + otp)
                    .to(user.getEmail())
                    .subject("Pulpy")
                    .build();
            String emailModelJson = gson.toJson(emailModel);
            produceMessage.sendMessage(emailModelJson);
            User userSaved = userRepository.save(user);
            return userSaved;
        }
        else{
            User savedUser = userRepository.getUserByEmail(user.getEmail());
            if(savedUser.getIsVerified()){
                throw new UserAlreadyExistsException(ExceptionMessages.USER_ALREADY_EXISTS);
            }
            else{
                throw new UserExistsButNotVerifiedException(ExceptionMessages.USER_EXISTS_BUT_NOT_VERIFIED);
            }
        }



    }

    public User getUserById(UUID userId) {
        return userRepository.findById(userId).get();
    }

    public User getUserByUserName(String username){
        return userRepository.getUserByEmail(username);
    }

    public ResponseEntity<?> verifyUser(UserVerification userVerification) {
        User user = userRepository.getUserByEmail(userVerification.emailId().toLowerCase(Locale.ROOT));
        if(user.getEmailOtp().equals(userVerification.emailOtp())){
            user.setIsVerified(true);
            userRepository.save(user);
            return new ResponseEntity(null, HttpStatus.OK);
        }
        else{
            throw new InvalidOtpException(ExceptionMessages.INVALID_OTP);
        }
    }

    public ResponseEntity<?> resendOtp(UUID userId) {
        User user = userRepository.findById(userId).get();
        String otp = CommonUtils.generateOtp();
        user.setEmailOtp(otp);
        user.setOtpEndTime(DateUtils.getTimeAfterOneHour());
        userRepository.save(user);
        EmailModel emailModel = EmailModel.builder()
                .message("New user " + otp)
                .to(user.getEmail())
                .subject("Pulpy")
                .build();
        String emailModelJson = gson.toJson(emailModel);
        produceMessage.sendMessage(emailModelJson);
        return new ResponseEntity<>(HttpStatus.OK);

    }

    public ResponseEntity<?> updateUserWithCreds(UUID userId, UserCredentials userCredentials) {
        User user = userRepository.findById(userId).get();
        user.setLinkedInUsername(userCredentials.linkedInUsername());
        user.setLinkedInPassword(userCredentials.linkedInPassword());
        userRepository.save(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
