package com.pulpy.sharedservices.utils;

import com.google.gson.Gson;

import java.util.*;

public class CommonUtils {
    static Gson gson = new Gson();
    static Random rnd = new Random();

    public static UUID getUserIdFromHeaderAsUUID(Map<String,String> headers){
        HashMap<String,Object> userDetails = gson.fromJson(headers.get("userdetails"), HashMap.class);
        return UUID.fromString(userDetails.get("userid").toString());
    }

    public static String generateOtp(){
        int number = rnd.nextInt(999999);
        return String.format("%06d", number);
    }



    public static String convertToLowerCase(String value){
        return value.toLowerCase();
    }

}
