import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export default function TeamTable() {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [team, setTeam] = useState([]);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const token = await getAccessTokenSilently({
          audience: 'https://ericnagtegaal.ca/api',
        });

        const res = await fetch('https://ericnagtegaal.ca/api/team', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error('Failed to fetch team');
        const data = await res.json();
        setTeam(data);
      } catch (err) {
        console.error('Failed to load team:', err);
      }
    };

    if (isAuthenticated) {
      fetchTeam();
    }
  }, [getAccessTokenSilently, isAuthenticated]);

  return (
    <div>
      <h2>Your Team</h2>
      <table>
        <thead>
          <tr>
            <th>Player id</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
        {team.map((player, index) => (
            <tr key={index}>
              <td>{player.player_id}</td>
              <td>Remove</td>
              {/* <button onClick={() => handleRemovePlayer(player.id)}>Remove</button> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
