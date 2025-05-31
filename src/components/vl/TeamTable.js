import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function TeamTable({ team, setTeam, teamCost, setTeamCost }) {
    const { getAccessTokenSilently, isAuthenticated } = useAuth0();


    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const token = await getAccessTokenSilently({
                    audience: "https://ericnagtegaal.ca/api",
                });

                const res = await fetch("https://ericnagtegaal.ca/api/team", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) throw new Error("Failed to fetch team");
                const data = await res.json();
                setTeam(data);
                setTeamCost(data.reduce((acc, player) => acc + parseInt(player.cost), 0));
            } catch (err) {
                console.error("Failed to load team:", err);
            }
        };

        if (isAuthenticated) {
            fetchTeam();
        }
    }, [getAccessTokenSilently, isAuthenticated]);

    const handleRemovePlayer = async (player_id) => {
        try {
            const token = await getAccessTokenSilently({
                audience: "https://ericnagtegaal.ca/api",
            });
            const res = await fetch("https://ericnagtegaal.ca/api/team/delete", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ player_id: player_id }),
            });

            if (!res.ok) throw new Error("Failed to add player");

            const data = await res.json();
            setTeam(prevTeam => {
                const newTeam = prevTeam.filter(player => player.player_id !== player_id);
                setTeamCost(newTeam.reduce((acc, player) => acc + parseInt(player.cost), 0));
                return newTeam;
            });
            console.log("Player removed:", data);
        } catch (err) {
            console.error("Delete player error:", err);
        }
    };
    return (
        <div>
            <h2 className="text-white sm:text-4xl text-3xl mb-4 font-medium title-font">Your Team</h2>
            <div className="mb-1">
                Total Team Cost: {teamCost}
            </div>
            <div className="mb-1">
                Unspent budget: {1100 - teamCost}
            </div>
            <table className="table-auto border border-gray-300 w-full">
                <thead>
                    <tr>
                        <th className="border border-gray-300 px-4 py-2 text-white font-bold">Player Name</th>
                        <th className="border border-gray-300 px-4 py-2 text-white font-bold">Player id</th>
                        <th className="border border-gray-300 px-4 py-2 text-white font-bold">Cost</th>
                        <th className="border border-gray-300 px-4 py-2 text-white font-bold">Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {team.map((player, index) => (
                        <tr key={index}>
                            <td className="border border-gray-300 px-4 py-2">{player.name}</td>
                            <td className="border border-gray-300 px-4 py-2">{player.player_id}</td>
                            <td className="border border-gray-300 px-4 py-2">{player.cost}</td>
                            <td className="border border-gray-300 px-4 py-2"><button className="hover:text-white hover:underline" onClick={() => handleRemovePlayer(player.player_id)}>Remove</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
