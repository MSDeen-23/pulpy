import React from "react";
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import MessagesContent from "../../features/Pages/campaign/messages.content";


function MessageDrawer(props){

    const messageTextAreaHandler = (val)=>{
        
        props.messageSubmittedHandler(val);
    }
    return(
        <React.Fragment>  
          <SwipeableDrawer
            anchor={"right"}
            open={true}
            className={"MessageDrawer"}
          >
            {/* <h1>{props.messageNode}</h1> */}
            <MessagesContent messageNode={props.messageNode} messageTextAreaHandler={messageTextAreaHandler} />
          </SwipeableDrawer>
        </React.Fragment>
    )
}

export default MessageDrawer;