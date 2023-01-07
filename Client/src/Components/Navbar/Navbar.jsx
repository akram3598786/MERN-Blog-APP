import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.style.css";
import { isAuthHandler } from '../Redux/Auth-context/action';
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
    navigate("/login");
  }

  // console.log(document.location.pathname);
  return (
    <div id="Navbar">

      <nav className="navbarDiv">

        <div id="leftNav" className="navLinks">
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/create">Write</Link>
        </div>

        {
          // document.location.pathname === "/" ?
          //   null
          //   :
            <div id="rightNav" className="navLinks">
              {isAuth ? <button id="SignOutBtn" onClick={handleSignout}>Sign Out</button> : null}
            </div>
        }
      </nav>
    </div>
  );
}