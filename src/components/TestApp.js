import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export default function TestApiCall() {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const callApi = async () => {
      try {
        const token = await getAccessTokenSilently({
          audience: "https://ericnagtegaal.ca/api",
        });

        const res = await fetch("https://ericnagtegaal.ca/api/test", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.text();
        setMessage(data);
      } catch (err) {
        console.error("API call failed:", err);
        setMessage("Failed to fetch API.");
      }
    };

    if (isAuthenticated) {
      callApi();
    }
  }, [getAccessTokenSilently, isAuthenticated]);

  return (
    <div>
      <h2>API Test</h2>
      <p>{message || "Waiting for response..."}</p>
    </div>
  );
}
