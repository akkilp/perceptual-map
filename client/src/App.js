import AdminSignin from './pages/AdminSignin';
import Login from './pages/Login';
import Signin from './pages/Signin';

import {useContext} from 'react'

import {AuthenticationContext} from './components/AuthenticationService'


function App() {
  const {user, setUser} = useContext(AuthenticationContext);

  return (
    <div className="App">
          <h2>
            Logged in: {!user ? "Not logged in" : "Logged in as " + user.username}
          </h2>
          <button onClick={()=>setUser(null)}>Logout</button>
          <Login/>
          <Signin/>
          <AdminSignin/>
    </div>
  );
}

export default App;
