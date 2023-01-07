import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AllBlogs from "./AllBlogs";
import styles from "./Homepage.style.css";

export default function Homepage(){

    
    const isAuth = useSelector((store) => store.isAuth.isAuth);
    const navigate = useNavigate();
    console.log(isAuth)
    useEffect(()=>{
        if(!isAuth) navigate("/login");
    },[]);

    return(
        <div id="blogsDiv">
        {isAuth ? <AllBlogs/> : <navigate to="/login/>"/>}
        </div>
    )
}