import React, {useState, useEffect} from 'react';
import {styled} from '@mui/material/styles';
import LinearProgress, {linearProgressClasses} from '@mui/material/LinearProgress';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import SendIcon from '@mui/icons-material/Send';
import PersonIcon from '@mui/icons-material/Person';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import "./settings.css"
import {InputAdornment, InputLabel, OutlinedInput, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {saveLinkedInCredentials} from "../../../app/main/service/ApiService/UserService";
import {toast} from "react-toastify";


const AlphaLinearProgress = styled(LinearProgress)(({theme}) => ({
    height: 4,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: theme.palette.mode === 'light' ? '#ff69a5' : '#ff69a5',
    },
}));

const BetaLinearProgress = styled(LinearProgress)(({theme}) => ({
    height: 4,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: theme.palette.mode === 'light' ? '#20c997' : '#20c997',
    },
}));

const CharlieLinearProgress = styled(LinearProgress)(({theme}) => ({
    height: 4,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: theme.palette.mode === 'light' ? '#1890ff' : '#1890ff',
    },
}));

const DeltaLinearProgress = styled(LinearProgress)(({theme}) => ({
    height: 4,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: theme.palette.mode === 'light' ? '#fa8b0c' : '#fa8b0c',
    },
}));

function Settings() {

    const [linkedInUserName, setLinkedInUserName] = useState('');
    const [linkedInPassword, setLinkedInPassword] = useState('');
    const linkedInUserNameChangeHandler = (event) => {
        setLinkedInUserName(event.target.value)
    };
    const linkedInPasswordChangeHandler = (event) => {
        setLinkedInPassword(event.target.value)
    };
    const [passwordTextFieldType, setPasswordTextFieldType] = useState('password');


    const changePasswordTextFieldType = () => {
        passwordTextFieldType === "password" ? setPasswordTextFieldType("text") : setPasswordTextFieldType("password")
    }
    const onCredsButtonSubmitClickHandler = () => {
        const linkedInCredsPayLload={
            linkedInUsername:linkedInUserName,
            linkedInPassword:linkedInPassword
        }
        saveLinkedInCredentials(linkedInCredsPayLload)
            .then((response) => {
                if (response.status === 200) {
                    toast.success("Success");
                }
            })
            .catch((error) => {
                toast.error(error.response.data.message);
            })

        console.log(linkedInUserName, linkedInPassword);
    }

    return (
        <>
            <section>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="purple-infocontent">
                                <h5>Settings</h5>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-8'>
                            <div className='row'>
                                <div className='col-md-4'>
                                    <div className='static-widget'>
                                        <ConnectWithoutContactIcon className='statistics-icon alpha-bg'/>
                                        <div className='statistics'>
                                            <span><h6>Connection Request</h6></span>
                                            <span>1/5</span>
                                        </div>
                                        <AlphaLinearProgress value={20} variant="determinate"
                                                             className="progress-bar-striped mt-2"/>
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className='static-widget'>
                                        <SendIcon className='statistics-icon beta-bg'/>
                                        <div className='statistics'>
                                            <span><h6>Message Sent</h6></span>
                                            <span>3/5</span>
                                        </div>
                                        <BetaLinearProgress value={80} variant="determinate"
                                                            className="progress-bar-striped mt-2"/>
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className='static-widget'>
                                        <PersonIcon className='statistics-icon charlie-bg'/>
                                        <div className='statistics'>
                                            <span><h6>Profile Viewed</h6></span>
                                            <span>3/5</span>
                                        </div>
                                        <CharlieLinearProgress value={80} variant="determinate"
                                                               className="progress-bar-striped mt-2"/>
                                    </div>
                                </div>

                            </div>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <div className="linkedin-creds">
                                        <Box className="linkedin-creds-box">
                                            <div>
                                                <TextField
                                                    variant="outlined"
                                                    className="w-100 mt-3"
                                                    label="Linked In Username"
                                                    onChange={linkedInUserNameChangeHandler}
                                                ></TextField>
                                            </div>
                                            <div>
                                                <FormControl className="w-100 mt-3" variant="outlined">
                                                    <InputLabel
                                                        htmlFor="outlined-adornment-password">Linked In Password</InputLabel>
                                                    <OutlinedInput
                                                        id="outlined-adornment-password"
                                                        type={passwordTextFieldType}
                                                        value={linkedInPassword}
                                                        onChange={linkedInPasswordChangeHandler}
                                                        endAdornment={
                                                            <InputAdornment position="end">
                                                                <IconButton
                                                                    aria-label="toggle password visibility"
                                                                    edge="end"
                                                                    onClick={changePasswordTextFieldType}
                                                                >
                                                                    {passwordTextFieldType === "text" ?
                                                                        <VisibilityOff/> : <Visibility/>}
                                                                </IconButton>
                                                            </InputAdornment>
                                                        }
                                                        label="Linked In Password"
                                                    />
                                                </FormControl>
                                                <div>
                                                    <Button
                                                        className="reactFlowBtn btn btn-primary float-right mt-3"
                                                        onClick={onCredsButtonSubmitClickHandler}
                                                    >

                                                        Save
                                                    </Button>
                                                </div>
                                            </div>
                                        </Box>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <div className="widget-activity">
                                <h5>Recent Activity</h5>
                            </div>
                        </div>
                    </div>
                    <div className='row'>

                    </div>

                </div>
            </section>
        </>
    )
}

export default Settings;
