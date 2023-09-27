import {pulpyApiService} from "./ApiService";
const baseUrl = "http://localhost:5001";
const leadsServiceUrl = baseUrl + "/api/v1/leads"


export const createLeads = (payload) => {
    return pulpyApiService({
        method: "post",
        url: leadsServiceUrl,
        data: payload,
    })
}

export const getLeads = () =>{
    return pulpyApiService({
        method: "get",
        url:leadsServiceUrl
    })
}
