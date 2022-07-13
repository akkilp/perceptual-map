import useAuth from "../hooks/useAuth";

import { Navigate } from "react-router-dom";
import Loading from "./Loading";


const ProtectedRoute = ({ children, redirectPath="/login" }) => {
    const { user, loading } = useAuth();

  if(loading){
      return <Loading/>
  }
  if (!user || !user.token) {
      return <Navigate to={redirectPath} replace />;
    }
  return children
};

export default ProtectedRoute