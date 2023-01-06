import axios from "axios";
import { useState } from "react"
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { isAuthHandler } from '../Redux/Auth-context/action';
import './Auth.css';
import React from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react';
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";
import { Spinner } from '@chakra-ui/react';

let obj = {
  email: "",
  password: ""
}

export default function Login() {
  const [formData, setformData] = useState(obj);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [doing, setdoing] = useState(false);
  const [show, setShow] = React.useState(false);

  const handleshow = () => {
    setShow((prev) => (!prev));
  }

  const handleSubmit = () => {
    if (formData.email.length == 0 || formData.password.length == 0) {
      alert("kindly fill all field !")
    } else if (doing) {
      alert("Wait for some time !");
    } else {
      setdoing(true);
      //  let url = "http://localhost:8080/auth/login";
      let url = "https://mern-app-blog-ver01.onrender.com/auth/login";
      axios.post(url, formData).
        then((res) => {
          if (res.status === 201) {
            alert("Logged In Successfully");
            const decoded = jwt_decode(res.data.token);
            const cookies = new Cookies();
            cookies.set("AccessToken", res.data.token, {
              expires: new Date(decoded.exp * 1000)
            });
            dispatch(isAuthHandler(true));
            navigate("/home");
          } else {
            alert("Kindly register first    !");
          }
        }).catch((err) => {
          alert("Kindly register first !");
          console.log(err);
        }).finally(() => {
          setdoing(false);
        });
    }
  }

const handleChange = (e) => {
  let { name, value } = e.target;
  setformData({ ...formData, [name]: value });
}

let { email, password } = formData;

return (
  <div className="container">
    <div className="LoginMainDiv">
      <div className="spinner">
        {doing ?
          <Spinner
            thickness='6px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
          /> : null}
      </div>
      <h1>Login Form</h1>
      <div id="LoginForm">
        <input className='Input' important type="email" value={email} name="email" id="" placeholder="Email" onChange={handleChange} />
        <input className='Input' important type={show ? 'text' : 'password'} value={password} name="password" placeholder="Password" onChange={handleChange} />
        <button style={{ marginTop: '-3px', alignSelf: 'flex-end', width: '50px', fontSize: '10px' }} onClick={handleshow} >{show ? 'Hide' : 'Show'}</button>
        <Button size='sm' onClick={() => handleSubmit()} colorScheme='blue'>Login</Button>
        <p>If you don't have an account : <Link style={{ color: 'blue' }} to="/signup">Create Account</Link></p>
      </div>
    </div>
    <h1 className="lastHeading"><span>Stay curious.</span> <br />
      Discover stories, thinking, and expertise from writers on any topic.</h1>
  </div>
)
}

