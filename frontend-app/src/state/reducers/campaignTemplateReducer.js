let stateInit = {
    message:{
        content:"",
        id:""
    },
    time:{
        timeUnit:"",
        timeValue:"",
        id:""
    },
    passedMessage:{
        content: "",
        id:""
    },
    passedTime:{
        id:"",
        timeUnit:"",
        timeValue:""
    }


}
const reducer = (state =stateInit,action) => {
    switch (action.type){
        case "campaignTemplate/addMessage":
            return {...state,message:{content: action.payload.content,id:action.payload.id}}
        case "campaignTemplate/setMessage":
            return {...state,passedMessage:{content: action.payload.content,id:action.payload.id}}
        case "campaignTemplate/addTime":
            return {...state,time:{timeUnit: action.payload.timeUnit,timeValue: action.payload.timeValue,id:action.payload.id}}
        case "campaignTemplate/setTime":
            return {...state,passedTime:{timeUnit: action.payload.timeUnit,timeValue: action.payload.timeValue,id:action.payload.id}}
        default:
            return state

    }
}

export default reducer;