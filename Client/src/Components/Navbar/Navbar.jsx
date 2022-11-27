import { Link } from "react-router-dom";
import style from "./Navbar.style.css";
export default function NavBar(){

    return(
      <div id="Navbar">
        <nav className="navbarDiv">
            <Link to="/">Home</Link>
            <Link to="/signup">SignUp</Link>
            <Link to="/login">Login</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/Posts">All Posts</Link>
        </nav>
      </div>
    );
}