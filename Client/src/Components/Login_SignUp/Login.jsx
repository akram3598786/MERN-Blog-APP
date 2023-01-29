import axios from "axios";
import { useState } from "react"
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { isAuthHandler, saveUser } from '../Redux/Auth-context/action';
import './Auth.css';
import React from "react";
import swal from 'sweetalert';
import { Button, ButtonGroup } from '@chakra-ui/react';
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";
import { Spinner } from '@chakra-ui/react';
import getLoggedUser from "../Utilities/GetLoggedUser";

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

  // Post data to for verification at backend
  const handleSubmit = () => {
    if (formData.email.length == 0 || formData.password.length == 0) {
      // alert("kindly fill all field !");
      swal("Kindly fill all field !",{button: false});
    } else if (doing) {
      swal("Wait for some time !",{button: false});
    } else {
      setdoing(true);
     // let url = "http://localhost:8080/auth/login";
      let url = "https://mern-app-blog-ver01.onrender.com/auth/login";
      axios.post(url, formData).
        then((res) => {
          if (res.status === 201) {
            // alert("Logged In Successfully");
            swal({
              title: "Logged In Successfully",
              icon: "success",
              timer: 1400,
              button: false,
            }).then((value) => {
              
              const decoded = jwt_decode(res.data.token);
              const cookies = new Cookies();
              cookies.set("AccessToken", res.data.token, decoded, {
                expires: new Date(decoded.exp * 1000)
              });
              cookies.set("loggedUser", decoded, {
                expires: new Date(decoded.exp * 1000)
              });
              dispatch(saveUser(decoded));
              dispatch(isAuthHandler(true));
              getLoggedUser();
              navigate("/dashboard");
            });
          }
          else {
            // console.log(res.response);
            swal({
              title :"Kindly register first",
              icon : "info"
            })
          }
        }).catch((err) => {
          console.log("Error", err.response);
          if (err.response.data === "Wrong Password") {
            swal({
              title :"Wrong Password",
               icon : "error"
            })
          } else {
            // swal("Kindly register first !");
            swal({
              title :"Kindly register first",
              icon : "info"
            })
          }
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