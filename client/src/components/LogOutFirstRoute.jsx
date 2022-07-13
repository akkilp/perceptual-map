import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

const LogOutFirstRoute = ({ children, redirectPath="/home" }) => {
    const { user } = useAuth();
  
    if (user || user.token) {
      return <Navigate to={redirectPath} replace />;
    }
  
    return children;
};

export default LogOutFirstRoute