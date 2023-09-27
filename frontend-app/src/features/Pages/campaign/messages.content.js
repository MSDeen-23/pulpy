import { Button, TextareaAutosize, Typography } from "@mui/material";
import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import {useDispatch, useSelector} from "react-redux";
import {bindActionCreators} from "redux";
import {campaignTemplateActions} from "../../../state";



function MessagesContent(props) {
    const messageValue = useSelector((state )=>state.campaignTemplate.passedMessage);
    const [textValue, setTextValue] = useState(messageValue.content);
    const dispatch = useDispatch();
    const {addMessage} = bindActionCreators(campaignTemplateActions,dispatch);
    const messageTextAreaChangeHandler = (event) =>{
        setTextValue(event.target.value);
    }
    const applyClickHandler=()=>{
        let messageContent = {
            id: messageValue.id,
            content: textValue
        }
        addMessage(messageContent)
    }
  return (
      
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <Typography
              variant="h6"
              component={"h6"}
              sx={{ mt: 2, mb: 1, fontSize: 16 }}
            >
              Input your LinkedIn Messages 
            </Typography>
          </div>
          <div className="col-md-12">
            <Stack direction="row" spacing={1} className="mt-2">
              <Chip label="First Name" onClick={() => setTextValue(`${textValue}%%FirstName%%`)}  className="DrawerChip" /> 
              <Chip label="Last Name" onClick={() => setTextValue(`${textValue}%%LastName%%`)} className="DrawerChip" />
              <Chip label="Position" onClick={() => setTextValue(`${textValue}%%Position%%`)} className="DrawerChip" />                           
            </Stack>
            <Stack direction="row" spacing={1} className="mt-2">
              <Chip label="Company" onClick={() => setTextValue(`${textValue}%%Company%%`)}  className="DrawerChip" /> 
              <Chip label="Location" onClick={() => setTextValue(`${textValue}%%Location%%`)} className="DrawerChip" />                       
            </Stack>
          </div>
          <div className="col-md-12 mt-3">
            <TextareaAutosize className="form-control" value={textValue} onChange={messageTextAreaChangeHandler} maxRows={4} />
          </div>
          <div className="col-md-12 mt-3">
            <Button className="btn btn-primary w-100" onClick={applyClickHandler} > Apply </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default MessagesContent;
