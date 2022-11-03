import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  console.log(user.uid);
  //before check the user first catch the user's current location
  const location = useLocation();
  if (loading) {
    // Use spinner here
    // return <progress className="progress w-56"></progress>;
    return <div>loading..........</div>;
  }
  if (!user?.uid) {
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
  }
  return children;
};

export default PrivateRoute;
