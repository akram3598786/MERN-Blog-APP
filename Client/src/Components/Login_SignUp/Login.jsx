import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";


let obj = {
    email : "",
    password:  ""
}
export default function Login(){
  const [formData, setformData] = useState(obj);
  const navigate = useNavigate();
    const handleSubmit=()=>{
       //console.log(formData);
       let url = "http://127.0.0.1:8080/auth/login";
       axios.post(url, formData).
       then((res)=>{
        if(res.status === 201){
            console.log(res);
           alert("Logged In Successfully");
           navigate("/");
        }
       }).catch((err)=>{
          console.log(err);
       });
    }
    const handleChange=(e)=>{
        let {name,value } = e.target;
        setformData({...formData, [name] : value});
    }
    let {email, password} = formData;
    
    return (
        <>
          <h2>Login Form</h2>
          <input type="email" value={email} name="email" id="" placeholder="Enter Email" onChange={handleChange}/>
          <input type="password" value={password} name="password" id="" placeholder="Enter Password" onChange={handleChange}/>
          <button onClick={handleSubmit}>Login</button>
        </>
    )
}