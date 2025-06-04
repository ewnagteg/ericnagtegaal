import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { fetchWithAuth, fetchWithAuthPost } from "../../api/fetchWithAuth";
import { LOCK_DATE } from "../../constants.js";

const LOCKED = Date.now() > LOCK_DATE;

export default function TeamTable({ team, setTeam, teamCost, setTeamCost }) {
    const { getAccessTokenSilently, isAuthenticated } = useAuth0();


    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const data = await fetchWithAuth({ getAccessTokenSilently, url: "/team" });
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
            const data = await fetchWithAuthPost({ getAccessTokenSilently, url: "/team/delete", body: { player_id: player_id } });
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
            <h2 className="text-white sm:text-3xl text-3xl mb-1 font-medium title-font">Your Team</h2>
            <div className="text-white sm:text-2xl text-2xl mb-1 font-medium title-font">
                Total Team Cost: {teamCost}
            </div>
            <div className="text-white sm:text-1 text-1 mb-1 font-medium title-font">
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
                        <tr key={index} className={`hover:bg-gray-700  ${index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800'} `}>
                            <td className="border border-gray-300 px-4 py-2">{player.name}</td>
                            <td className="border border-gray-300 px-4 py-2">{player.player_id}</td>
                            <td className="border border-gray-300 px-4 py-2">{player.cost}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                {!LOCKED && <button className="hover:text-white hover:underline" onClick={() => handleRemovePlayer(player.player_id)}>Remove</button>}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
