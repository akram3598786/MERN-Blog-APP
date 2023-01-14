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
    cookies.remove("loggedUser");
    dispatch(isAuthHandler(false));
    navigate("/login");
  }

   console.log(document.location.pathname);
  return (
    <div id="Navbar">

      <nav className="navbarDiv">

        <div id="leftNav" className="navLinks">
          <Link to="/" style={document.location.pathname === '/' ?{backgroundColor:'rgb(52, 95, 97)',padding:'3px 8px',borderRadius:'8px'} :null}>Home</Link>
          <Link to="/dashboard" style={document.location.pathname === '/dashboard' ?{backgroundColor:'rgb(52, 95, 97)',padding:'5px 8px',borderRadius:'8px'} :null}>Dashboard</Link>
          <Link to="/profile" style={document.location.pathname === '/profile' ?{backgroundColor:'rgb(52, 95, 97)',padding:'5px 8px',borderRadius:'8px'} :null}>Profile</Link>
          <Link to="/create" style={document.location.pathname === '/create' ?{backgroundColor:'rgb(52, 95, 97)',padding:'5px 8px',borderRadius:'8px'} :null}>Write</Link>
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