import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const RouteProtectedLogin = ({
  isAllowed,
  children,
  redirectTo = "/user",
}) => {
  if (isAllowed) {
    return <Navigate to={redirectTo} />;
  }
  return children ? children : <Outlet />;
};
