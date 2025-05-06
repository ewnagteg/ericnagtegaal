import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";

// const PrivateRoute = ({ children }) => {
//   const { isAuthenticated, isLoading } = useAuth0();

//   if (isLoading) return <div>Loading...</div>;
//   return isAuthenticated ? children : <Navigate to="/login" />;
// };
const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <div>redirect...</div>; // Wait for authentication state
  if (!isAuthenticated) return <Navigate to="/login" />; // Redirect if not authenticated

  return children; // Render the protected route (e.g., /admin)
};
export default PrivateRoute;