import React, { Component } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import {useSelector} from "react-redux";


export default class Login extends Component {
  render() {
    return (
      <>
        <section className="pulpy-layout h-100">
          <div className="auth-container">
            <div className="container-fluid m-0 p-0">
              <div className="row">
                <div className="col-md-4">
                  <div className="leftcontent">
                    <h4>Pulpy.io</h4>
                    <h5>WelcomeBack!</h5>
                    <p>Sign into continue to Pulpy.io</p>
                    <div className="form-box">
                      <p>Sign In</p>
                      <div className="box-content">
                        <div className="col-md-12">
                          <TextField
                            id="outlined-basic"
                            label="Email Address"
                            variant="outlined"
                            className="w-100 mt-2"
                            size="small"
                          />
                        </div>
                        <div className="col-md-12">
                          <TextField
                            id="outlined-basic"
                            label="Password"
                            variant="outlined"
                            className="w-100 mt-2"
                            size="small"
                          />
                        </div>
                        <a href="#" className="grey-link">
                          ForgotPassword?
                        </a>
                      </div>
                    </div>
                    <div className="login">
                      <div className="Drop-button">
                        <Link
                          variant="contained"
                          to="/dashboard"
                          className="btn btn-primary w-100"
                        >
                          Sign In
                        </Link>
                        <p>
                          Don't have an account?{" "}
                          <Link to="/signup">Sign up</Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-8">
                  <img
                    src="../images/loginbg.png"
                    className="img-fluid loginBg"
                  />
                  <div className="company-rights">
                    <p>© 2021 Pulpy.io. All Rights Reserved.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}
