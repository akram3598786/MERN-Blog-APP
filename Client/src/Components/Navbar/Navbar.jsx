import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.style.css";
import { DeleteUser, deleteUser, isAuthHandler } from '../Redux/Auth-context/action';
import Cookies from 'universal-cookie';
import { Button } from "@chakra-ui/react";
import Right_Drawer from "./Rightdrawer";
import { useState } from "react";
import Login from "../Login_SignUp/Login";

export default function NavBar() {
  const isAuth = useSelector((store) => store.user.isAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openDrawer,setopenDrawer] = useState(false);
  //console.log(isAuth)
  const handleSignout = () => {
    const cookies = new Cookies();
    cookies.remove("AccessToken");
    cookies.remove("loggedUser");
    dispatch(isAuthHandler(false));
    dispatch(DeleteUser());
    navigate("/login");
  }
  const handleOpenDrawer=()=>{
    setopenDrawer(true);
  }

  //  console.log(document.location.pathname);
  return (
    <div id="Navbar">

      <nav className="navbarDiv">

        <div id="leftNav" className="navLinks">
          <Link to="/" style={document.location.pathname === '/' ? { backgroundColor: 'rgb(52, 95, 97)', padding: '1px 6px', borderRadius: '8px' } : null}>Home</Link>
          <Link to="/dashboard" style={document.location.pathname === '/dashboard' ? { backgroundColor: 'rgb(52, 95, 97)', padding: '5px 8px', borderRadius: '8px' } : null}>Dashboard</Link>
          {/* <Link to="/profile" style={document.location.pathname === '/profile' ? { backgroundColor: 'rgb(52, 95, 97)', padding: '5px 8px', borderRadius: '8px' } : null}>Account</Link> */}
          { isAuth ? <Right_Drawer/> : <h1 style={{cursor : 'pointer'}} onClick={()=>navigate("/login")}>Account</h1>}
          <Link to="/create" style={document.location.pathname === '/create' ? { backgroundColor: 'rgb(52, 95, 97)', padding: '5px 8px', borderRadius: '8px' } : null}>Write</Link>
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