import { useState } from "react";
// import axios,, {isCancel, AxiosError} from 'axios';
import axios, {isCancel, AxiosError} from 'axios';
import {  useNavigate } from "react-router-dom";

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
   let url = "http://127.0.0.1:8080/auth/signup";
   axios.post(url, formData).
   then((res)=>{
    if(res.status === 201){
        alert(`${name} registred successfully`);
        navigate("/login");
    } 
    else console.log("something went wrong !")
   }).catch((err)=>{
      console.error(err);
   })

   console.log(formData);
}
let {name, email, mobile, password} = formData;
  return (
   <>
   <h2 >Registration Form</h2>
     <form action="submit" >
        <input type="text" name="name" value={name} onChange={handeChange} id="" placeholder="NAME"/>
        <input type="email" name="email" value={email} onChange={handeChange} placeholder="EMAIL" />
        <input type="number" name="mobile" value={mobile} onChange={handeChange} placeholder="MOBILE NO." />
        <input type="password" name="password" value={password} onChange={handeChange} placeholder="PASSWORD" /> <br />
        <button onClick={handlsSubmit}>Submit</button>
     </form>
   </>
  );
   
}