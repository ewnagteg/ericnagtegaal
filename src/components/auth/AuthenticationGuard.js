import { withAuthenticationRequired } from "@auth0/auth0-react";
import React from "react";

import { useAuth0 } from "@auth0/auth0-react";
export const AuthenticationGuard = ({ component }) => {
  const { user, isAuthenticated } = useAuth0();
  console.log("gaurd isAuthenticated:", isAuthenticated, "user:", user);
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <div className="page-layout">
        <p>Redirect...</p>
      </div>
    ),
  });

  return <Component />;
};