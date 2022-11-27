import './App.css';
import { Routes, Route} from "react-router-dom";
import SignUp from './Components/Login_SignUp/SignUp';
import Homepage from './Components/Home/Homepage';
import Login from './Components/Login_SignUp/Login';
import NavBar from './Components/Navbar/Navbar';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Routes>
        <Route path='/' element={<Homepage/>}></Route>
        <Route path='/signup' element={<SignUp/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
      </Routes>
  
    </div>
  );
}

export default App;
