package com.pulpy.sharedservices.utils;

import com.google.gson.JsonObject;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

public class FileUtils {
    public static String readFromFileAsString(String filePath) throws FileNotFoundException {

        try {
            StringBuffer dataBuffer = new StringBuffer();
            File myObj = new File(filePath);
            Scanner myReader = new Scanner(myObj);
            while (myReader.hasNextLine()) {
                String data = myReader.nextLine();
                dataBuffer.append(data);
            }
            myReader.close();
            return dataBuffer.toString();
        } catch (FileNotFoundException e) {
            throw new FileNotFoundException();
        }
    }

}
