import { Button, Typography } from "@mui/material";
import React, { useState } from "react";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {useDispatch, useSelector} from "react-redux";
import {bindActionCreators} from "redux";
import {campaignTemplateActions} from "../../../state";



function TimelineContent(props) {
    const passedTime = useSelector((state )=>state.campaignTemplate.passedTime);

    const [timeUnit,setTimeUnit] = useState(passedTime.timeUnit);
    const [timeValue,setTimeValue] = useState(passedTime.timeValue);

    const dispatch = useDispatch();
    const {addTime} = bindActionCreators(campaignTemplateActions,dispatch);

    const timeUnitChangeHandler = event =>{
        setTimeUnit(event.target.value);
    }
    const timeValChangeHandler = event =>{
        setTimeValue(event.target.value);
    }
    const applyClickHandler=()=>{
        let timeContent = {
            id: passedTime.id,
            timeUnit,
            timeValue,
        }
        addTime(timeContent)
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
              Delay before the next section
            </Typography>
          </div>
         
        
          
        </div>
        <div className="row">
        <div className="col-md-4 mt-3">
        <FormControl fullWidth>
        
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={timeUnit}
          label="Number"
          onChange={timeUnitChangeHandler}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
        </Select>
      </FormControl>
          </div>  
          <div className="col-md-8 mt-3">
          <FormControl fullWidth>
       
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={timeValue}
          label="Time"
          onChange={timeValChangeHandler}
        >
          <MenuItem value={"Day"}>Day</MenuItem>
          <MenuItem value={"Hour"}>Hour</MenuItem>
        </Select>
      </FormControl>
          </div>  
        </div>
        <div className="row">
        <div className="col-md-12 mt-3">
            <Button className="btn btn-primary w-100" onClick={applyClickHandler} > Apply </Button>
          </div>  
        </div>
      </div>
    </>
  );
}

export default TimelineContent;
