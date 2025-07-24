import { withAuthenticationRequired } from "@auth0/auth0-react";

import { useAuth0 } from "@auth0/auth0-react";
export const AuthenticationGuard = ({ component }) => {
  const { user, isAuthenticated } = useAuth0();
  console.log("gaurd isAuthenticated:", isAuthenticated, "user:", user);
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <div className="fixed inset-0 bg-gray-900 page-layout flex items-center justify-center">
        <p>Redirect...</p>
      </div>
    ),
  });

  return <Component />;
};