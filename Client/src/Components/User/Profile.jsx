import { useState } from "react";
import { useEffect } from "react";
import "./Profile.css"


export default function Profile() {

    const [user, setuser] = useState({});

    useEffect(() => {
        getUserData();
    }, []);

    const getUserData =async () => {
        let userData = await JSON.parse(localStorage.getItem("LoggedUser"));
        setuser(userData);
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