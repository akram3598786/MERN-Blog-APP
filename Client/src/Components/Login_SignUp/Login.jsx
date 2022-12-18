import axios from "axios";
import { useState } from "react"
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { isAuthHandler } from '../Redux/Auth-context/action';


let obj = {
    email : "",
    password:  ""
}
export default function Login(){
  const [formData, setformData] = useState(obj);
  const navigate = useNavigate();
  const dispatch = useDispatch();

    const handleSubmit=()=>{
      //  let url = "https://mern-app-blog-ver01.herokuapp.com/auth/login";
       let url = "https://mern-app-blog-ver01.onrender.com/auth/login";
       axios.post(url, formData).
       then((res)=>{
        if(res.status === 201){
            console.log(res);
           alert("Logged In Successfully");
           localStorage.setItem("LoggedUser", JSON.stringify(res.data.foundUser));
           dispatch(isAuthHandler(true));
           navigate("/");
        }else{
          console.log(res)
          alert("Kindly register first !");
        }
       }).catch((err)=>{
        alert("Kindly register first !");
          console.log(err);
       })
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
          <button onClick={handleSubmit}>Login</button> <br /><br />
          <p>If you dont have Account : <Link to="/signup">Create Account</Link></p>
        </>
    )
}