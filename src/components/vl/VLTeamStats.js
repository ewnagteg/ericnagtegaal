import React, { useEffect, useState } from "react";
import VLNavBar from "./VLNavBar.js";
import { useAuth0 } from "@auth0/auth0-react";
import { fetchWithAuth } from "../../api/fetchWithAuth";

export default function VLPlayerStats() {
    const [teamStats, setTeamStats] = useState({});
    const { getAccessTokenSilently, isAuthenticated } = useAuth0();
    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await fetchWithAuth({ getAccessTokenSilently, url: '/team-stats' });
                const vlteams = {};
                for (let row of data) {
                    if (!(row.username in vlteams))
                        vlteams[row.username] = [];
                    vlteams[row.username].push(row);
                }
                setTeamStats(vlteams);
            } catch (err) {
                console.error("Failed to fetch stats:", err);
            }
        };
        if (isAuthenticated) {
            fetchStats();
        }
    }, [getAccessTokenSilently, isAuthenticated]);

    return (
        <main className="text-gray-400 bg-gray-900 body-font">
            <VLNavBar />
            <section className="relative min-h-screen py-10">
                <div className="container mx-auto px-5">
                    <h1 className="text-white sm:text-3xl">Teams stats</h1>
                    <div className="mt-10 h-full">
                        {Object.entries(teamStats).map(([user, players]) => (
                            <div key={user} className="p-2 mt-2">
                                <h2 className="text-white sm:text-6x1 text-2xl">User: {user}</h2>
                                <table className="table-auto border border-gray-300">
                                    <thead>
                                        <tr className="bg-gray-600">
                                            <th className="border border-gray-300 px-4 py-2 text-white font-bold">Player Name</th>
                                            <th className="border border-gray-300 px-4 py-2 text-white font-bold">Player id</th>
                                            <th className="border border-gray-300 px-4 py-2 text-white font-bold">Points</th>
                                            <th className="border border-gray-300 px-4 py-2 text-white font-bold">Group Ids</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {players.map((player, index) => (
                                            <tr key={index} className={`hover:bg-gray-700  ${index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800'} `}>
                                                <td className="border border-gray-300 px-4 py-2">{player.name}</td>
                                                <td className="border border-gray-300 px-4 py-2">{player.player_id}</td>
                                                <td className="border border-gray-300 px-4 py-2">{player.total_kills}</td>
                                                <td className="border border-gray-300 px-4 py-2">{player.groupids}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
