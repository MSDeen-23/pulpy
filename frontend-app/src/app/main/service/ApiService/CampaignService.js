import {pulpyApiService} from "./ApiService";
const baseUrl = "http://localhost:5001";
const campaignServiceUrl = baseUrl + "/api/v1/campaign"

export const saveCampaign = (payload) => {
    return pulpyApiService({
        method: "post",
        url: campaignServiceUrl,
        data: payload,
    })
}