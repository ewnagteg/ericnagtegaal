import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <div>redirect...</div>;
  if (!isAuthenticated) return <Navigate to="/login" />;
  return children;
};
export default PrivateRoute;