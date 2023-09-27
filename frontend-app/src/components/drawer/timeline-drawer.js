import React from "react";
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import TimelineContent from "../../features/Pages/campaign/timelineContent";


function TimelineDrawer(props){

    return(
        <React.Fragment>  
          <SwipeableDrawer
            anchor={"right"}
            open={true}
            className={"MessageDrawer"}
          >
            <TimelineContent timeNode={props.timeNode} />
          </SwipeableDrawer>
        </React.Fragment>
    )
}

export default TimelineDrawer;