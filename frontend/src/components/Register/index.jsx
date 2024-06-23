import React, { useState } from 'react'
import axios from 'axios';
import './styles.scss'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [inputs, setInputs] = useState({
    email: "",
    username: "",
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
    //Validation
    if(inputs.password != inputs.confirm_password) {
        setErrorSpan("Password is not matched!");
    } else {
        try {
        const response = await axios.post(`${window.location.origin}/api/auth/register`, inputs);
        toast.success(`${inputs.username} has been succesfully Registered. You may Login`) // Show the alert with the response message
        console.log(response);
        setInputs({
            email: "",
            username: "",
            password: "",
            confirm_password: ""
        });
        navigate("/login");
        } catch (error) {
        console.error("There was an error registering!", error);
        setErrorSpan("User Email Already Exists");
        }
    }
  }

  return (
    <section className="register-section">
        <div className="container">
            <form className=" register-form " onSubmit={handleSubmit}>
                <h1 className='text-center'>Register Form</h1>
                {(errorSpan == "")?null:<p className='text-danger text-center'>{errorSpan}</p>}
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" className="form-control" name="username" value={inputs.username} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" name='email' value={inputs.email} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password' value={inputs.password} onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="confirm_password" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" name='confirm_password' value={inputs.confirm_password} onChange={handleChange}/>
                </div>
                <button type="submit" className="btn btn-gradient-app" >Submit</button>
                <p className="redirect"> Already Register? <a href="/login">Login Here</a></p>
            </form>
            <div className="login-form">
                <p>
                    Already Register?<br/><a href="/login">Login Here</a>
                </p>
            </div>
        </div>
    </section>
  )
}

export default Register