import AdminSignin from './pages/AdminSignin';
import Login from './pages/Login';
import Signin from './pages/Signin';

import { Routes, Route } from "react-router-dom";
import NavBar from './components/NavBar';
import { AuthenticationContext } from './components/AuthenticationService';
import {useContext} from 'react'

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/signin/admin" element={<AdminSignin/>}/>
      </Routes>
    </div>
  );
}

export default App;
