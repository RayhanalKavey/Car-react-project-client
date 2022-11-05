import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  //before check the user first catch the user's current location
  const location = useLocation();
  if (loading) {
    // Use spinner here
    return <h3>loading..........</h3>;
  }
  if (!user?.uid) {
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
  }
  return children;
};

export default PrivateRoute;
// import React, { useContext } from "react";
// import { Navigate, useLocation } from "react-router-dom";
// import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";

// const PrivateRoute = ({ children }) => {
//   const { user, loading } = useContext(AuthContext);
//   const location = useLocation();

//   if (loading) {
//     return <h1 className="text-5xl">Loading...</h1>;
//   }

//   if (user) {
//     return children;
//   }

//   return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
// };

// export default PrivateRoute;
