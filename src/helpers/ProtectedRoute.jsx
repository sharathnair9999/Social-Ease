import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation, useParams } from "react-router-dom";

const ProtectedRoute = ({ children, route }) => {
  const userState = useSelector((state) => state.auth);
  const location = useLocation();
  const { profileId } = useParams();

  return userState.isLoggedIn ? (
    userState.uid !== profileId ? (
      <Navigate replace={true} to={route} state={{ from: location }} />
    ) : (
      children
    )
  ) : (
    <Navigate
      replace={true}
      to={`/profile/${profileId}`}
      state={{ from: location }}
    />
  );
};

export default ProtectedRoute;
