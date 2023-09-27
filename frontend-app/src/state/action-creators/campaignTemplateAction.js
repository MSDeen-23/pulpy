export const addMessage = (payload) => {
    return(dispatch)=>{
        dispatch({
            type: "campaignTemplate/addMessage",
            payload
        })
    }
}

export const addTime = (payload) => {
    console.log(payload);
    return(dispatch)=>{
        dispatch({
            type: "campaignTemplate/addTime",
            payload
        })
    }
}



export const setMessage = (payload) => {
    console.log(payload);
    return(dispatch)=>{
        dispatch({
            type: "campaignTemplate/setMessage",
            payload
        })
    }
}

export const setTime  = (payload) => {
    console.log(payload);
    return(dispatch)=>{
        dispatch({
            type: "campaignTemplate/setTime",
            payload
        })
    }
}



