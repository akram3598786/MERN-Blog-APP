import axios from "axios";
import { useState } from "react";
import {  useNavigate } from "react-router-dom";
import './Auth.css';


let obj ={
    name : "",
    email : "",
    mobile : "",
    password : ""
}

export default function SignUp(){
const [formData, setformData] = useState(obj);
const navigate = useNavigate();

const handeChange=(e)=>{
    let {name, value} = e.target;
    setformData({...formData, [name] : value});
}
const handlsSubmit=(e)=>{
   e.preventDefault();
  //  let url = "https://mern-app-blog-ver01.herokuapp.com/auth/signup";
   let url = "https://mern-app-blog-ver01.onrender.com/auth/signup";
   axios.post(url, formData).
   then((res)=>{
    if(res.status === 201){
        alert(`${name} registred successfully`);
        navigate("/login");
    } 
    else console.log("something went wrong !");
   }).catch((err)=>{
      console.log(err);
   })

}
let {name, email, mobile, password} = formData;
  return (
   <div id="SignupDiv">
   <h2 >Registration Form</h2>
     <form action="submit"  >
        <label htmlFor=""><span>Name : </span> <input type="text" name="name" value={name} onChange={handeChange} id="" placeholder="NAME"/></label>
        <label htmlFor=""><span>Email : </span><input type="email" name="email" value={email} onChange={handeChange} placeholder="EMAIL" /></label>
        <label htmlFor=""><span>Mobile : </span> <input type="mobile" name="mobile" value={mobile} onChange={handeChange} placeholder="MOBILE NO." /></label>
       <label htmlFor=""><span>Password  : </span> <input type="password" name="password" value={password} onChange={handeChange} placeholder="PASSWORD" /></label>
     </form>
     <button id="submitBtn" onClick={handlsSubmit}>Submit</button>
   </div>
  );
   
}