import axios from "axios";
import {pulpyApiService} from "./ApiService";

const baseUrl = "http://localhost:5001";
const templateServiceUrl = baseUrl+"/api/v1/template"

export const saveTemplate=(payload)=>{
    return pulpyApiService({
        method: "post",
        url: templateServiceUrl,
        data: payload,

    })
}


export const getTemplates=()=>{
    return pulpyApiService({
        method: "get",
        url:templateServiceUrl
    })
}