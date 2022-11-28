import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AllBlogs from "./AllBlogs";
import style from "./Homepage.style.css";

export default function Homepage(){

    const isAuth = useSelector((store) => store.isAuth.isAuth);
    const navigate = useNavigate();
    if(!isAuth) navigate("/login");

    return(
        <div id="blogsDiv">
         <h2>This is Home Page</h2>
         <AllBlogs/>
        </div>
    )
}