import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import './Auth.css';
import { Spinner } from '@chakra-ui/react'


let obj = {
  name: "",
  email: "",
  mobile: "",
  password: ""
}

// Post data to database in terms of user registration
export default function SignUp() {
  const [formData, setformData] = useState(obj);
  const navigate = useNavigate();
  const [doing, setdoing] = useState(false);

  let { name, email, mobile, password } = formData;

  const handeChange = (e) => {
    let { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  }
  const handlsSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !mobile) alert("Kindly fill all details !")
    if (doing) {
      alert("Wait for some time !");
    } else {
      setdoing(true);
      // let url = "http://localhost:8080/auth/signup";
       let url = "https://mern-app-blog-ver01.onrender.com/auth/signup";
      axios.post(url, formData).
        then((res) => {
          if (res.status === 201) {
            alert(`${name} registred successfully`);
            navigate("/login");
          }
        }).catch((err) => {
          console.log(err);
          if (err.response.data.message == "Email is already registered.") alert("This email already registered");
          else alert("something went wrong !");
        }).finally(() => setdoing(false));
    }
  }

  return (
    <div className="container">
    <div id="SignupDiv">
      {doing ? <Spinner
        thickness='6px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
      /> : null}
      <h1 >Registration Form</h1>
      <form action="submit"  >
        <label htmlFor=""> <input type="text" name="name" value={name} onChange={handeChange} id="" placeholder="NAME" /></label>
        <label htmlFor=""><input type="email" name="email" value={email} onChange={handeChange} placeholder="EMAIL" /></label>
        <label htmlFor=""><input type="mobile" name="mobile" value={mobile} onChange={handeChange} placeholder="MOBILE NO." /></label>
        <label htmlFor=""> <input type="password" name="password" value={password} onChange={handeChange} placeholder="PASSWORD" /></label>
      </form>
      <button id="submitBtn" onClick={handlsSubmit}>Submit</button>
      <p>Already have an account : <Link style={{ color: 'blue', fontWeight: '' }} to="/login">Sign In</Link></p>
    </div>
    </div>
  );
}