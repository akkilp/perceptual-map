import AdminSignin from './pages/AdminSignin';
import Login from './pages/Login';
import Signin from './pages/Signin';

import {useContext} from 'react'

import {AuthenticationContext} from './components/AuthenticationService'

import {
  Routes,
  Route,
} from "react-router-dom";


function App() {
  const {user, setUser, logOut} = useContext(AuthenticationContext);

  return (
    <div className="App">
          <h2>
            Logged in: {!user ? "Not logged in" : "Logged in as " + user.username}
          </h2>
          <button onClick={logOut}>Logout</button>
          <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signin" element={<Signin/>}/>
            <Route path="/signin/admin" element={<AdminSignin/>}/>
          </Routes>
    </div>
  );
}

export default App;
