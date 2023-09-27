import React, { useState} from 'react';
import TextField from "@mui/material/TextField";
import {useLocation, useNavigate} from "react-router-dom";
import {verifyUser} from "../../../app/main/service/ApiService/UserService";
import {toast} from "react-toastify";

const Verification = ({ route, navigation }) => {
    const {search}=useLocation();
    const searchParams = new URLSearchParams(search);
    const [emailId] = useState(searchParams.get('emailId'))
    const [emailOtp,setEmailOtp] = useState('')
    const navigate = useNavigate();


    const emailOtpChangeHandler = (event)=>{
        setEmailOtp(event.target.value);
    }
    const submitHandler = (event) => {
        const verificationPayLoad ={
            emailId:emailId,
            emailOtp:emailOtp
        }
        verifyUser(verificationPayLoad)
            .then((response)=>{
                if(response.status===200){
                    toast.success("User verified!")
                    navigate('/', {replace: true})
                }
            })
            .catch((error)=>{
                toast.error(error.response.data.message);
            })
        console.log("Hello done"+emailOtp);

    }
    return (
        <div>
            <section className="pulpy-layout h-100">
                <div className="auth-container">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="leftcontent">
                                    <h4>Pulpy.io</h4>
                                    <div className="form-box">
                                        <p>Verification</p>
                                        <div className="box-content">
                                            <div className="col-md-12">
                                                <TextField
                                                    id="emailOtp"
                                                    label="Email Otp"
                                                    variant="outlined"
                                                    className="w-100 mt-2"
                                                    size="small"
                                                    value={emailOtp}
                                                    onChange={emailOtpChangeHandler}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="login">
                                        <div className="Drop-button" >
                                            <div
                                                className="btn btn-primary w-100"
                                                onClick={submitHandler}
                                            >
                                                Submit
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-8">

                                <div className="company-rights">
                                    <p>© 2021 Pulpy.io. All Rights Reserved.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Verification;
