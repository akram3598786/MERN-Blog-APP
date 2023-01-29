import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AllBlogs from "./AllBlogs";
import styles from "./Homepage.style.css";
import Cookies from 'universal-cookie';

export default function Homepage(){
    const isAuth = useSelector((store) => store.user.isAuth);
    const navigate = useNavigate();

    const cookie = new Cookies();
    const loggedUser = cookie.get("loggedUser") || undefined;
    // console.log(isAuth)
    useEffect(()=>{
        if(!isAuth || !loggedUser) navigate("/login");
    },[]);

    return(
        <div id="blogsDiv">
        {isAuth ? <AllBlogs/> : <navigate to="/login/>"/>}
        </div>
    )
}