import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AllBlogs from "./AllBlogs";
import styles from "./Homepage.style.css";

export default function Homepage(){

    
    const isAuth = useSelector((store) => store.isAuth.isAuth);
    const navigate = useNavigate();
    
    useEffect(()=>{
        if(!isAuth) navigate("/");
    },[]);

    return(
        <div id="blogsDiv">
         <AllBlogs/>
        </div>
    )
}