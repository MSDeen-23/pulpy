export const setLeadsList = (payload) => {
    console.log(payload);
    return(dispatch)=>{
        dispatch({
            type: "campaign/setLeadsList",
            payload
        })
    }
}

export const setTemplate = (payload) => {
    console.log(payload);
    return(dispatch)=>{
        dispatch({
            type: "campaign/setTemplate",
            payload
        })
    }
}