package com.pulpy.sharedservices.utils;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;

public class JSONUtils {

    public static JsonObject convertStringAsJson(String data) {
        JsonObject jsonObject = new Gson().fromJson(data, JsonObject.class);
        return jsonObject;
    }

    public static String jsonObjectToString(Object jsonObject) {
        String emailModelJson =  new Gson().toJson(jsonObject);
        return emailModelJson;
    }
}
