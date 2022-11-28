import './App.css';
import { Routes, Route } from "react-router-dom";
import SignUp from './Components/Login_SignUp/SignUp';
import Homepage from './Components/Home/Homepage';
import Login from './Components/Login_SignUp/Login';
import NavBar from './Components/Navbar/Navbar';
import { useSelector } from 'react-redux';
import BlogDetails from './Components/Blogs/BlogDetails';
import CreateBlog from './Components/Blogs/CreateBlog';
import Profile from './Components/User/Profile';


function App() {
  const isAuth = useSelector((store) => store.isAuth.isAuth);

  return (
    <div className="App">
      <NavBar />
      {!isAuth ? 
      <>
      {/* <Login/> */}
      <Routes>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/signup' element={<SignUp />}></Route>
      </Routes>
      </>:
      <Routes>
        <Route path='/' element={<Homepage />}></Route>
        <Route path='/post/:blogId' element={<BlogDetails />}></Route>
        <Route path='/create' element={<CreateBlog/> }></Route>
        <Route path='/profile' element={<Profile/> }></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<SignUp />}></Route>
      </Routes>}
    </div>
  );
}

export default App;
