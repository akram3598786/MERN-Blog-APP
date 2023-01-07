import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import getLoggedUser from "../Utilities/GetLoggedUser";
import { Button,Avatar} from '@chakra-ui/react';
import { ArrowForwardIcon,EditIcon } from '@chakra-ui/icons';
import EditProfile from "./EditProfile";


export default function Profile() {

    const isAuth = useSelector((store) => store.isAuth.isAuth);
    const navigate = useNavigate();
    const [user, setuser] = useState({});
    const [ShowEditForm,setShowEditForm] = useState(false);
    const loggedUser = getLoggedUser();

    useEffect(() => {
        if (!isAuth) navigate("/login");
        getUserData();
    }, []);

    const getUserData = async () => {
        setuser(loggedUser);
    }

    return (

        <div className="userDetailMainDiv">
            <Button rightIcon={<EditIcon />} onClick={()=>setShowEditForm(true)} colorScheme='teal' variant='solid'>Edit Profile</Button> 
            <div id="userDetail">
                {/* <img src="https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/approved-profile-icon.svg" alt="" /> */}
               <div><Avatar src={!user.avatar ?  'https://bit.ly/broken-link' : user.avatar} /></div> 
                <h2>{user.name}</h2>
                <p>EMAIL : {user.email}</p>
                <p>MOBILE : {user.mobile}</p>
            </div>
            {/* Edit Form Toggle */}
            { ShowEditForm ?
            <div className="EditProfileForm">
                 <EditProfile setShowEditForm={setShowEditForm} userdetails = {loggedUser} upadteduser={setuser}/> 
            </div>
            : null}
        </div>
    )
}