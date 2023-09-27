import {combineReducers} from "redux"
import campaignTemplateReducer from "./campaignTemplateReducer";
import campaignReducer from "./campaignReducer";
const reducers = combineReducers({
    campaignTemplate:campaignTemplateReducer,
    campaign:campaignReducer
});

export default reducers;