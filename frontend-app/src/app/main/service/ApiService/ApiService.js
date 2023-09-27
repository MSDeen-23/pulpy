import axios from "axios";
import {toast} from "react-toastify";

export const pulpyApiService = (axiosPayload) => {
    const token = localStorage.getItem('token');
    if (!token) {
        toast.error("Your session is invalidated. Please login again!!");
        setTimeout(window.location.href = "/", 3000);
    }

    const request = axios({
        ...axiosPayload,
        headers: {"Content-Type": "application/json", Authorization: 'Bearer ' + token}
    })
    return request
        .then((response) => {
            console.log(response);
            return response;
        }).catch((error) => {
            console.log(error.response.status);
            if (error.response.status === 401) {
                localStorage.clear();
                toast.error("Your session is invalidated. Please login again!!");
                setTimeout(window.location.href = "/", 3000);
            }
            return Promise.reject(error);
            ;
        })

}