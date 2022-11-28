import './App.css';
import { Routes, Route } from "react-router-dom";
import SignUp from './Components/Login_SignUp/SignUp';
import Homepage from './Components/Home/Homepage';
import Login from './Components/Login_SignUp/Login';
import NavBar from './Components/Navbar/Navbar';
import { useSelector } from 'react-redux';


function App() {
  const isAuth = useSelector((store) => store.isAuth.isAuth);

  return (
    <div className="App">
      <NavBar />
      {!isAuth ? <Login/> :
      <Routes>
        <Route path='/' element={<Homepage />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<SignUp />}></Route>
      </Routes>}
    </div>
  );
}

export default App;
