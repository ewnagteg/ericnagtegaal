import React from "react";
import Navbar from "./NavBar";
import LoginButton from "./Login.js";
import Profile from "./Profile.js";
import { useAuth0 } from '@auth0/auth0-react';
import TeamTable from "./TeamTable.js";





export default function VLApp() {
    const { getAccessTokenSilently } = useAuth0();

    const players = {
        "1": { name: "Player 1" },
        "2": { name: "Player 2" },
        "3": { name: "Player 3" },
        "4": { name: "Player 4" },
        "5": { name: "Player 5" },
    };

    const handleAddPlayer = async (playerId) => {
        try {
          const token = await getAccessTokenSilently({
            audience: "https://ericnagtegaal.ca/api",
          });
      
          const res = await fetch("https://ericnagtegaal.ca/api/team/add", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ playerId }),
          });
      
          if (!res.ok) throw new Error("Failed to add player");
      
          const data = await res.json();
          console.log("Player added:", data);
        } catch (err) {
          console.error("Add player error:", err);
        }
      };
    return (<main className="text-gray-400 bg-gray-900 body-font">
        <Navbar />
        <LoginButton />
        <Profile />
        <div className="container mx-auto flex px-10 py-20 md:flex-row flex-col items-center">

            <section>
                <TeamTable/>
                <table border="1" cellPadding="8">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>id</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(players).map(([id, player]) => (
                            <tr key={id}>
                                <td>{player.name}</td>
                                <td>{id}</td>
                                <td>
                                    <button onClick={() => handleAddPlayer(id)}>Add</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    </main>)
};