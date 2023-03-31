import React, { useState } from 'react'
import "../CSS/Login.css";
import { useNavigate } from 'react-router-dom' ;


const Login = (props) => {
    const [credentials, setCredentials] = useState({email: "", password: ""})
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        // eslint-disable-next-line 
        const json = await response.json();
        console.log(json)
        if(json.success){
            localStorage.setItem('token',json.authtoken)
            navigate('/');
            props.showAlert("Account logged in successfully  ","success")
        }
        else{
           props.showAlert("Invalid credential ","danger")

        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (<>
        <section className="vh-100">
            <div className="container-fluid h-custom">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-9 col-lg-6 col-xl-5">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                            className="img-fluid" alt="Sample loginImage " />
                    </div>
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        <form onSubmit={handleSubmit}>
                            <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                                <p className="lead fw-normal mb-0 me-3">Sign in with</p>
                                <button type="button" className="btn btn-primary btn-floating mx-1">
                                    <i className="fab fa-facebook-f"></i>
                                </button>

                                <button type="button" className="btn btn-primary btn-floating mx-1">
                                    <i className="fab fa-twitter"></i>
                                </button>

                                <button type="button" className="btn btn-primary btn-floating mx-1">
                                    <i className="fab fa-linkedin-in"></i>
                                </button>
                            </div>

                            <div className="divider d-flex align-items-center my-4">
                                <p className="text-center fw-bold mx-3 mb-0">Or</p>
                            </div>


                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="email">Email address</label>
                                <input type="email" id="email" value={credentials.email} onChange={onChange} name="email" className="form-control form-control-lg"
                                    placeholder="Enter a valid email address" />
                            </div>


                            <div className="form-outline mb-3">
                                <label className="form-label" htmlFor="password">Password</label>
                                <input type="password" id="passqord" value={credentials.password} onChange={onChange} name="password" className="form-control form-control-lg"
                                    placeholder="Enter password" />
                            </div>

                            <div className="d-flex justify-content-between align-items-center">
                                <a href="#!" className="text-body">Forgot password?</a>
                            </div>

                            <div className="text-center text-lg-start mt-4 pt-2">
                                <button type="submit" className="btn btn-primary btn-lg"
                                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}>Login</button>
                                <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="#!"
                                    className="link-danger">Register</a></p>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
            <div
                class="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">

                <div class="text-white mb-3 mb-md-0">
                    Copyright © 2020. All rights reserved.
                </div>



                <div>
                    <a href="#!" class="text-white me-4">
                        <i class="fab fa-facebook-f"></i>
                    </a>
                    <a href="#!" class="text-white me-4">
                        <i class="fab fa-twitter"></i>
                    </a>
                    <a href="#!" class="text-white me-4">
                        <i class="fab fa-google"></i>
                    </a>
                    <a href="#!" class="text-white">
                        <i class="fab fa-linkedin-in"></i>
                    </a>
                </div>

            </div>
        </section>

    </>
    )
}

export default Login