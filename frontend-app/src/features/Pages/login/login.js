import React, {useEffect, useState} from "react";
import TextField from "@mui/material/TextField";
import {Link, useNavigate} from "react-router-dom";
import {  toast } from 'react-toastify';
import {signInUser} from "../../../app/main/service/ApiService/UserService";



function Login(props) {
  const [username,setEnteredUserName] = useState('')
  const [password,setEnteredPassword] = useState('')
  const navigate = useNavigate();

  const usernameChangeHandler=(event)=>{
    setEnteredUserName(event.target.value);
  }
  const passwordChangeHandler = (event)=>{
    setEnteredPassword(event.target.value);
  }
  useEffect(()=>{
    const token = localStorage.getItem('token')
    if(token!=null){
      navigate('/dashboard', {replace: true})
    }

  })
  const signInHandler = (event) =>{

    const signInPayLoad={
      username:username,
      password:password
    }
    signInUser(signInPayLoad)
        .then((response)=>{
          if(response.status===200){
            localStorage.setItem('token',response.data.jwtToken);
            navigate('/dashboard', {replace: true})
          }
        })
        .catch((error)=>{
          if(error.response.data.code===403){
            navigate('/verification?emailId='+username, {replace: true})
          }
          toast.error(error.response.data.message);
        })
  }

    return (
      <>
        <section className="pulpy-layout bg-image h-100">
          <div className="auth-container">
            <div className="container-fluid">
              <div className="row g-0">
                <div className="col-md-4">
                  <div className="leftcontent">
                  <i className="pulpyLogo"></i>
                    <h5>WelcomeBack!</h5>
                    <p>Sign into continue to Pulpy.io</p>
                    <div className="form-box">
                      <p>Sign In</p>
                      <div className="box-content">
                        <div className="col-md-12">
                          <TextField
                            id="username"
                            label="Email Address"
                            variant="outlined"
                            className="w-100 mt-2"
                            size="small"
                            value={username}
                            onChange={usernameChangeHandler}
                          />
                        </div>
                        <div className="col-md-12">
                          <TextField
                            id="password"
                            label="Password"
                            hintText="Password"
                            type="password"
                            variant="outlined"
                            className="w-100 mt-2"
                            size="small"
                            value={password}
                            onChange={passwordChangeHandler}
                          />
                        </div>
                        <Link to="/dashboard" className="grey-link">
                          ForgotPassword?
                        </Link>
                      </div>
                    </div>
                    <div className="login">
                      <div className="Drop-button" >
                        <div
                          className="btn btn-primary w-100"
                          onClick={signInHandler}
                        >
                          Sign In
                        </div>
                        <p>
                          Don't have an account?{" "}
                          <Link to="/signup">Sign up</Link>
                        </p>
                      </div>
                      <div className="company-rights">
                            <p>© 2021 Pulpy.io. All Rights Reserved.</p>
                                </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-8">
                 
                    <i className="loginAnimated"></i>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
}

export default Login;