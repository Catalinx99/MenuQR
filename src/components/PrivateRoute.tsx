// src/components/PrivateRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAtom } from "jotai";
import { isAuthenticatedAtom } from "../atoms/authAtoms";

interface PrivateRouteProps {
  element: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const [isAuthenticated] = useAtom(isAuthenticatedAtom);
  console.log(isAuthenticated, "isAuthenticated");

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{element}</>;
};

export default PrivateRoute;
