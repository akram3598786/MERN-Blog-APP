import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.style.css";
import { isAuthHandler } from '../Redux/Auth-context/action';
import { FaSearch } from 'react-icons/fa';

export default function NavBar() {
  const isAuth = useSelector((store) => store.isAuth.isAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //console.log(isAuth)
  const handleSignout = () => {
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
            <div style={isAuth ? {display:'none'} : {position:'absolute'}} id="searchBar">
              <input type="search" 
              fill={<FaSearch/>}
              />
              <button onClick={handleSearch}>Search</button>
            </div>
            : 
            <div id="rightNav" className="navLinks">
            {isAuth ? <button id="SignOutBtn" onClick={handleSignout}>Sign Out</button> : null}
          </div>
        }
      </nav>
     
    </div>
  );
}