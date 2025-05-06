import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export default function LoginRedirect() {
  const { loginWithRedirect } = useAuth0();

  useEffect(() => {
    loginWithRedirect({
      redirect_uri: window.location.origin + '/',  // Explicitly set redirect URI to /admin
    });
  }, [loginWithRedirect]);

  return <p>Redirecting to login...</p>;
}