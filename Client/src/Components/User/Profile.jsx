import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";


export default function Profile() {
  
    const isAuth = useSelector((store) => store.isAuth.isAuth);
    const navigate = useNavigate();
    const [user, setuser] = useState({});
    
    useEffect(() => {
        if(!isAuth) navigate("/");
        getUserData();
    }, []);
    
    const getUserData =async () => {
        const cookie = new Cookies();
        let token = cookie.get("AccessToken");
        let decodedUser = jwt_decode(token);
        setuser(decodedUser);
    }

    return (

        <>
            <h1>User Profile</h1>
            
            <div id="userDetail">
                <img src="https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/approved-profile-icon.svg" alt="" />
               <h2>{user.name}</h2>
               <p>EMAIL : {user.email}</p>
               <p>MOBILE : {user.mobile}</p>
            </div>
        </>
    )   
}