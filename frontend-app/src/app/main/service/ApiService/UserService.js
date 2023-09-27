import axios from "axios";

const baseUrl = "http://localhost:5001";
const userServiceUrl = baseUrl+"/api/v1/user"
const oauthServiceUrl = baseUrl+"/api/v1/oauth"

export const registerUser=(payload)=>{

    return  axios({
        method: "post",
        url: userServiceUrl+"/register",
        data: payload,
        headers: { "Content-Type": "application/json" },
    })
}

export const verifyUser=(payload)=>{
    return  axios({
        method: "post",
        url: userServiceUrl+"/verify-user",
        data: payload,
        headers: { "Content-Type": "application/json" },
    })
}

export const signInUser=(payload)=>{
    return  axios({
        method: "post",
        url: oauthServiceUrl+"/authenticate",
        data: payload,
        headers: { "Content-Type": "application/json" },
    })
}


export const saveLinkedInCredentials=(payload)=>{
    return  axios({
        method: "put",
        url: userServiceUrl+"/credentials",
        data: payload,
        headers: { "Content-Type": "application/json",Authorization: 'Bearer '+localStorage.getItem("token") },
    })
}


