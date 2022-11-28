import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import style from "./Navbar.style.css";
import { isAuthHandler } from '../Redux/Auth-context/action'


export default function NavBar() {
  const isAuth = useSelector((store) => store.isAuth.isAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
//console.log(isAuth)
  const handleSignout = () => {
    console.log('Sign oyt clickex')
    dispatch(isAuthHandler(false));
    navigate("/login");
  }

  return (
    <div id="Navbar">
      <nav className="navbarDiv">
        <div id="leftNav" className="navLinks">
          <Link to="/">Home</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/Posts">All Posts</Link>
        </div>
        <div id="rightNav" className="navLinks">
          {isAuth ? <button id="SignOutBtn" onClick={handleSignout}>Sign Out</button> :
            <><Link className="AuthLink" to="/signup">SignUp</Link>
              <Link className="AuthLink" to="/login">Login</Link></>
          }
        </div>
      </nav>
    </div>
  );
}