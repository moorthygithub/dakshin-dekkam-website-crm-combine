import { Navigate, Outlet, useLocation } from "react-router-dom";

import useAuth from "@/hooks/api/use-auth";

import { isAuthRoute } from "./common/routePaths";

const AuthRoute = () => {
  const location = useLocation();
  const { data: authData, isLoading } = useAuth();
  const user = authData?.user;

  const _isAuthRoute = isAuthRoute(location.pathname);
  console.log(_isAuthRoute, "_isAuthRoute");
  if (isLoading && !_isAuthRoute) return null;

  if (!user) return <Outlet />;

  return <Navigate to="/crm/home" replace />;
};

export default AuthRoute;
