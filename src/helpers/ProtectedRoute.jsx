import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation, useParams } from "react-router-dom";

const ProtectedRoute = ({ children, route, onlyLoggedUserRoute }) => {
  const userState = useSelector((state) => state.auth);
  const location = useLocation();
  const { profileId } = useParams();

  if (onlyLoggedUserRoute) {
    return userState.isLoggedIn ? (
      userState.uid === profileId ? (
        children
      ) : (
        <Navigate
          to={`/profile/${profileId}`}
          place={true}
          state={{ from: location }}
        />
      )
    ) : (
      <Navigate to={"/login"} replace={true} state={{ from: location }} />
    );
  }

  return userState.isLoggedIn ? (
    children
  ) : (
    <Navigate replace={true} to={route} state={{ from: location }} />
  );
};

export default ProtectedRoute;
