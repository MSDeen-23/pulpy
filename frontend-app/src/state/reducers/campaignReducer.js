let campaignReducerInit = {
    selectedLeadsList:{
        leadsListId: "",
        leadsListName:""
    },
    selectedTemplate:{
        selectedTemplateId: "",
        selectedTemplateName:""
    }
}

const reducer = (state =campaignReducerInit,action) => {
    switch (action.type){
        case "campaign/setLeadsList":
            return {...state,selectedLeadsList:{leadsListId: action.payload.leadsListId,
                    leadsListName:action.payload.leadsListName}}
        case "campaign/setTemplate":
            console.log("Came here");
            console.log(action.payload);
            console.log(state);
            return {...state,selectedTemplate:{selectedTemplateId: action.payload.selectedTemplateId,
                    selectedTemplateName:action.payload.selectedTemplateName}}
        default:
            return state

    }
}

export default reducer;