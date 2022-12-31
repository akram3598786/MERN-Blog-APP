import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.style.css";
import { isAuthHandler } from '../Redux/Auth-context/action';
import { FaSearch } from 'react-icons/fa';
import Cookies from 'universal-cookie';

export default function NavBar() {
  const isAuth = useSelector((store) => store.isAuth.isAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //console.log(isAuth)
  const handleSignout = () => {
    const cookies = new Cookies();
    cookies.remove("AccessToken");
    dispatch(isAuthHandler(false));
    navigate("/");
  }
  const handleSearch = () => {

  }

  // console.log(document.location.pathname);
  return (
    <div id="Navbar">

      <nav className="navbarDiv">

        <div id="leftNav" className="navLinks">
          <Link to="/home">Home</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/create">Create blog</Link>
        </div>

        {
          document.location.pathname === "/" ?
            null
            :
            <div id="rightNav" className="navLinks">
              {isAuth ? <button id="SignOutBtn" onClick={handleSignout}>Sign Out</button> : null}
            </div>
        }
      </nav>
    </div>
  );
}