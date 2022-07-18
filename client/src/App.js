import { Routes, Route, Navigate } from 'react-router-dom'

import NavBar from './components/NavBar'
import AdminSignin from './pages/AdminSignin'
import Login from './pages/Login'
import Signin from './pages/Signin'
import UserPage from './pages/UserPage'
import Lander from './pages/Lander'
import Home from './pages/Home'
import MapPage from './pages/MapPage'
import BrowseMaps from './pages/BrowseMaps'
import ProtectedRoute from './components/ProtectedRoute'
import CreateMap from './pages/CreateMap'

function App() {
    return (
        <div className="App">
            <NavBar />
            <Routes>
                <Route
                    path="/home"
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                />
                <Route path="/" element={<Lander />} />
                <Route path="/me" element={<UserPage />} />
                <Route path="/maps" element={<BrowseMaps />} />
                <Route path="/maps/create" element={<CreateMap />} />
                <Route path="/maps/:mapId" element={<MapPage />} />

                <Route path="/login" element={<Login />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/signin/admin" element={<AdminSignin />} />
                {/*         <Route
            path="*"
            element={<Navigate to="/" replace />}
        /> */}
            </Routes>
        </div>
    )
}

export default App
