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
import EditBlog from './Components/Blogs/EditBlog';
import PublishedBlogs from './Components/Published blogs/PublishedBlogs';
import SavedBlogList from './Components/User/Bookmarks';


function App() {
  const isAuth = useSelector((store) => {
    return store.user.isAuth
  });

  return (
    <div className="App">
      <NavBar />

      <Routes>
        <Route path='/dashboard' element={<Homepage />}></Route>         {/* Private Route */}
        <Route path='/post/:blogId' element={<BlogDetails />}></Route>   {/* Private Route */}
        <Route path='/post/edit/:blogId' element={<EditBlog />}></Route> {/* Private Route */}
        <Route path='/create' element={<CreateBlog />}></Route>          {/* Private Route */}
        <Route path='/profile' element={<Profile />}></Route>            {/* Private Route */}
        <Route path='/bookmarks' element={<SavedBlogList />}></Route>    {/* Private Route */}

        <Route path='/login' element={<Login />}></Route>                {/* Public Route */}
        <Route path='/signup' element={<SignUp />}></Route>              {/* Public Route */}
        <Route path='/' element={<PublishedBlogs />}></Route>            {/* Public Route */}
      </Routes>
    </div>
  );
}

export default App;
