import React, { useState } from 'react'
import axios from 'axios';
import './styles.scss'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../data';

const Login = () => {
    const dispatch = useDispatch();
    const [inputs, setInputs] = useState({
      email: "",
      password: "",
    });
    
    const navigate = useNavigate();

    const [errorSpan, setErrorSpan] = useState("");

    const handleChange = (e) => {
    const {name, value} = e.target;
    setInputs({...inputs, [name]: value});
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post(`${window.location.origin}/api/auth/login`, inputs);
        toast.success(`${inputs.email} account has been succesfully Logined.`) // Show the alert with the response message
        sessionStorage.setItem("id", response.data.others._id);
        dispatch(authActions.login());
        console.log(response);
        navigate("/");
    } catch (error) {
        console.error("There was an error registering!", error);
        setErrorSpan("Incorrect User Password or Email");
    }}

  return (
    <section className="login-section">
        <div className="container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h1 className='text-center'>Login</h1>
                {(errorSpan == "")?null:<p className='text-danger text-center'>{errorSpan}</p>}
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" name="email" value={inputs.email} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" value={inputs.password} onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-gradient-app">Login</button>
                <p className="redirect">Don't have account? <a href="/register">Register Here</a></p>
            </form>
            <div className="register-form">
                <p>
                    Don't have account?<br/><a href="/register">Register Here</a>
                </p>
            </div>
        </div>
    </section>
  )
}

export default Login