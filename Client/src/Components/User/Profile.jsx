import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import getLoggedUser from "../Utilities/GetLoggedUser";


export default function Profile() {
  
    const isAuth = useSelector((store) => store.isAuth.isAuth);
    const navigate = useNavigate();
    const [user, setuser] = useState({});
    
    useEffect(() => {
        if(!isAuth) navigate("/login");
        getUserData();
    }, []);
    
    const getUserData =async () => {
        const loggedUser = getLoggedUser();
        setuser(loggedUser);
    }

    return (

        <div className="userDetailMainDiv">
            <h1>User Profile</h1>
            
            <div id="userDetail">
                <img src="https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/approved-profile-icon.svg" alt="" />
               <h2>{user.name}</h2>
               <p>EMAIL : {user.email}</p>
               <p>MOBILE : {user.mobile}</p>
            </div>
        </div>
    )   
}