
import { Routes, Route } from "react-router-dom";
import { AuthenticationContext } from './components/AuthenticationService';
import {useContext} from 'react'

import NavBar from './components/NavBar';
import AdminSignin from './pages/AdminSignin';
import Login from './pages/Login';
import Signin from './pages/Signin';
import UserPage from './pages/UserPage';
import Lander from "./pages/Lander";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Routes>
        <Route path="/home" element={<Home/>}/>
        <Route path="/lander" element={<Lander/>}/>
        <Route path="/user" element={<UserPage/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/signin/admin" element={<AdminSignin/>}/>
      </Routes>
    </div>
  );
}

export default App;
