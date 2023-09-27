package com.pulpy.templateservice.utils;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import org.apache.commons.lang.math.NumberUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Path;
import java.util.*;

@Service
public class Utils {
    @Value("${json-file-location}")
    private  String jsonFileLocation;
    public final String generateStepData(String templateData){
        JsonArray jsObj =  (JsonArray) new Gson().fromJson(templateData, JsonElement.class);
        List<JsonObject> nodes = new ArrayList<>();
        LinkedHashMap<String,JsonObject> nodeMap = new LinkedHashMap<>();

        List<JsonObject> relations =  new ArrayList<>();
        List<JsonObject> onlyNodes =  new ArrayList<>();
        List<JsonObject> visitedNodes = new ArrayList<>();
        jsObj.forEach(jsonElement -> {
            if(((JsonObject) jsonElement).get("source")==null){
                if(NumberUtils.isNumber(((JsonObject) jsonElement).get("id").toString().replace("\"","")))
                    onlyNodes.add((JsonObject) jsonElement);
                nodes.add((JsonObject) jsonElement);
            }
            else{
                relations.add((JsonObject) jsonElement);
            }
        });
        nodes.stream().forEach(item->{
            nodeMap.put(item.get("id").getAsString(),item);
        });
        int stepId = 1;
        LinkedHashMap<String,Object> steps = new LinkedHashMap<>();
        for(int i=0;i<onlyNodes.size();i++){
            String id = onlyNodes.get(i).getAsJsonObject().get("id").getAsBigInteger().toString();
            if(i==0){
                steps.put("step_id",stepId);
                steps.put("sequence_step_id",id);
                String type = onlyNodes.get(i).getAsJsonObject().get("data").getAsJsonObject().get("type").getAsString();
                steps.put("type",type);
                if(type=="MESSAGE"){
                    try {
                        String messageContent = onlyNodes.get(i).getAsJsonObject().get("data")
                                .getAsJsonObject().get("messsageContent").toString();
                        steps.put("messageContent", messageContent);
                    }
                    catch (NullPointerException e){
                        steps.put("messageContent", "");
                    }
                }
                steps.put("yes",null);
                steps.put("no",null);

            }
            else{
                LinkedHashMap<String,Object> subSteps = new LinkedHashMap<>();
                subSteps.put("step_id",++stepId);
                subSteps.put("sequence_step_id",id);
                String type = onlyNodes.get(i).getAsJsonObject().get("data").getAsJsonObject().get("type").getAsString();
                subSteps.put("type",type);
                LinkedHashMap<String,Object> delays = new LinkedHashMap<>();
                subSteps.put("yes",null);
                subSteps.put("no",null);
                if(type.equals("MESSAGE")){
                    try {
                        String messageContent = onlyNodes.get(i).getAsJsonObject().get("data")
                                .getAsJsonObject().get("messsageContent").getAsString();
                        subSteps.put("messageContent", messageContent);
                    }catch (NullPointerException nullPointerException){
                        subSteps.put("messageContent", "");
                    }
                }
                List<Integer> sequenceStepId = new ArrayList<>();
                Arrays.stream(id.split("")).forEach(item->{sequenceStepId.add(Integer.parseInt(item));});
                int lastIndex = sequenceStepId.size()-1;
                String parentString = id.substring(0,lastIndex);
                char lastCharacter = id.charAt(lastIndex);
                if(lastCharacter=='1'){
                    String nodeToGetTime = parentString+"a";
                    String timeUnit = nodeMap.get(nodeToGetTime).get("data").getAsJsonObject()
                            .get("timeUnit").getAsString();
                    String value =  nodeMap.get(nodeToGetTime).get("data").getAsJsonObject()
                            .get("timeValue").getAsString();
                    delays.put("timeUnit",timeUnit);
                    delays.put("value",value);
                    subSteps.put("delay",delays);
                }
                else if(lastCharacter=='2'){
                    String nodeToGetTime = parentString+"b";
                    String timeUnit = nodeMap.get(nodeToGetTime).get("data").getAsJsonObject()
                            .get("timeUnit").getAsString();
                    String value =  nodeMap.get(nodeToGetTime).get("data").getAsJsonObject()
                            .get("timeValue").getAsString();
                    delays.put("timeUnit",timeUnit);
                    delays.put("value",value);
                    subSteps.put("delay",delays);
                }

                System.out.println(sequenceStepId);
                buildSubStep(steps,sequenceStepId,subSteps,1);
                System.out.println(steps);
           }
        }
        Gson gson = new Gson();
        String json = gson.toJson(steps);
        System.out.println(json);
        return json;
    }

    private void buildSubStep(LinkedHashMap<String,Object> step,List<Integer> sequenceStepId,
                              LinkedHashMap<String,Object> subStep,int iterator) {
        if(iterator==sequenceStepId.size()-1){
            if(sequenceStepId.get(iterator)==1){
                step.put("no",subStep);
            }
            else if(sequenceStepId.get(iterator)==2){
                step.put("yes",subStep);
            }
        }
        else if(iterator<sequenceStepId.size()) {
            if(sequenceStepId.get(iterator)==1){
                buildSubStep((LinkedHashMap<String, Object>) step.get("no"), sequenceStepId,subStep, ++iterator);
            }
            else if(sequenceStepId.get(iterator)==2){
                buildSubStep((LinkedHashMap<String, Object>) step.get("yes"), sequenceStepId,subStep, ++iterator);
            }

        }
    }

    public  final String writeToFile(String jsonValue,String whatFile) throws IOException {
        String uuid = UUID.randomUUID().toString();
        try {
            String fileName = Path.of(jsonFileLocation,"json",uuid,whatFile).toString();
            File file = new File(fileName);
            if(!file.exists()) {
                file.getParentFile().mkdirs();
            file.createNewFile();
            }
            FileWriter myWriter = new FileWriter(file);

            myWriter.write(jsonValue);
            myWriter.close();

            return fileName;
        } catch (IOException e) {
            throw e;
        }

    }
}
