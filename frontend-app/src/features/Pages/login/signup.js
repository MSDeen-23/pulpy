import React, {useState} from "react";

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {Link, useNavigate} from 'react-router-dom';
import {registerUser} from "../../../app/main/service/ApiService/UserService";
import {toast} from "react-toastify";


const SignUp = (props) => {
    const [firstName, setEnteredfirstName] = useState('')
    const [lastName, setEnteredlastName] = useState('')
    const [email, setEnteredEmail] = useState('')
    const [password, setEnteredPassword] = useState('')
    const [linkedInUsername,setlinkedInUsername] = useState('')
    const [linkedInPassword,setLinkedInPassword] = useState('')
    const navigate = useNavigate();

    const firstNameChangeHandler = (event) => {setEnteredfirstName(event.target.value)}
    const lastNameChangeHandler = (event) => {setEnteredlastName(event.target.value)}
    const emailChangeHandler = (event) => {setEnteredEmail(event.target.value)}
    const passwordChangeHandler = (event) => {setEnteredPassword(event.target.value);}
    const linkedInUsernameChangeHandler = (event) => {setlinkedInUsername(event.target.value);}
    const linkedInPasswordChangeHandler = (event) => {setLinkedInPassword(event.target.value);}
    const signUpHandler = (event) => {
        const signUpPayLoadData = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            linkedInUsername: linkedInUsername,
            linkedInPassword: linkedInPassword
        }
        registerUser(signUpPayLoadData)
            .then((response) => {
                console.log(response)
                navigate('/verification?emailId='+email, {replace: true})
            }).catch((error) => {
            toast.error(error.response.data.message);
        })

    }

    return (
        <>
            <div className="container-fluid">
                <div className="row g-0">
                    <div className="col-md-4">
                        <div className="leftcontent">
                        <i className="pulpyLogo"></i>
                            <h5>Register account</h5>
                            <p>Get Free 14 Days Trial Account now</p>
                            <div className="form-box">
                                <p>Sign Up</p>
                                <div className="box-content">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <TextField id="firstName" label="First Name" value={firstName}
                                                       variant="outlined" className="w-100 mt-2" size="small"
                                                       onChange={firstNameChangeHandler}/>
                                        </div>
                                        <div className="col-md-6">
                                            <TextField id="lastName" label="Last Name" value={lastName}
                                                       variant="outlined" className="w-100 mt-2" size="small"
                                                       onChange={lastNameChangeHandler}/>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <TextField id="emailAddress" label="Email Address" value={email}
                                                   variant="outlined" className="w-100 mt-2" size="small" type="email"
                                                   onChange={emailChangeHandler}/>
                                    </div>
                                    <div className="col-md-12">
                                        <TextField id="password" label="Password" value={password} type="password"
                                                   variant="outlined" className="w-100 mt-2" size="small"
                                                   onChange={passwordChangeHandler}/>
                                    </div>

                                    <div className="col-md-12">
                                        <TextField id="linkedInUsername" label="Linked In Email" value={linkedInUsername}
                                                   variant="outlined" className="w-100 mt-2" size="small" type="email"
                                                   onChange={linkedInUsernameChangeHandler}/>
                                    </div>
                                    <div className="col-md-12">
                                        <TextField id="password" label="Linked In Password" value={linkedInPassword} type="password"
                                                   variant="outlined" className="w-100 mt-2" size="small"
                                                   onChange={linkedInPasswordChangeHandler}/>
                                    </div>
                                </div>
                            </div>
                            <div className="login">
                                <div className="Drop-button">
                                    <Button variant="contained" className="btn btn-primary w-100"
                                            onClick={signUpHandler}>Sign Up</Button>
                                    <Button variant="outline" className="btn btn-Secondary w-100 mt-3">Sign up with
                                        Google</Button>
                                    <p>Already have an account? <Link to="/">Sign In</Link></p>
                                </div>
                            </div>
                            <div className="company-rights">
                            <p>© 2021 Pulpy.io. All Rights Reserved.</p>
                                </div>
                        </div>
                    </div>
                    <div className="col-md-8">

                        <div className="company-rights">
                        <i className="signupAnimated"></i>
                           
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignUp;