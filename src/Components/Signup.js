import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../CSS/Signup.css'
const Signup = (props) => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
    const navigate = useNavigate();
    const { name, email, password,cpassword} = credentials
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (password === cpassword) {
            const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password })
            });
            // eslint-disable-next-line 
            const json = await response.json();
            if (json.success) {
                localStorage.setItem('token', json.authtoken)
                navigate('/');
                props.showAlert(" Account created successfully ", "success")
                setCredentials({ name: "", email: "", password: "", cpassword: "" })

            }
            else {
                props.showAlert("Sorry a user with this email already exists", "danger")
            }
        }
        else {
            props.showAlert("Confirm Password does not match", "danger")
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <section className="100vh" style={{ backgroundColor: "#eee",}}>
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-12 col-xl-11">
                        <div className="card text-black" n>
                            <div className="card-body p-md-5">
                                <div className="row justify-content-center">
                                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                                        <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-user fa-lg mt-4  me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <label className="form-label" htmlFor="name">Your Name</label>
                                                    <input type="text" id="name" name="name" onChange={onChange} className="form-control" required />
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-envelope fa-lg mt-4 me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <label className="form-label" htmlFor="email">Your Email</label>
                                                    <input type="email" id="email" name="email" onChange={onChange} className="form-control" required />
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-lock fa-lg mt-4  me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <label className="form-label" htmlFor="password">Password</label>
                                                    <input type="password" id="password" name="password" value={password} onChange={onChange} className="form-control" minLength={5} required />
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-key fa-lg mt-4  me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <label className="form-label" htmlFor="cpassword">Repeat your password</label>
                                                    <input type="password" id="cpassword" name="cpassword" onChange={onChange} className="form-control" minLength={5} required />
                                                </div>
                                            </div>

                                            {/* <div className="form-check d-flex justify-content-center mb-5">
                                                <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                                                <label className="form-check-label" for="form2Example3">
                                                    I agree all statements in <a href="#!">Terms of service</a>
                                                </label>
                                            </div> */}

                                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                <button type="submit" className="btn btn-primary btn-lg">Register</button>
                                            </div>

                                        </form>

                                    </div>
                                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                            className="img-fluid" alt="Sample signupImage  " />

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Signup