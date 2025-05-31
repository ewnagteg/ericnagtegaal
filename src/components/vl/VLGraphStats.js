// components/StatsPage.js
import React, { useEffect, useState } from "react";
import LineChart from "../LineChart.js";
import VLNavBar from "./VLNavBar.js";
import { useAuth0 } from "@auth0/auth0-react";

export default function StatsPage() {
    const [chartData, setChartData] = useState(null);
    const { getAccessTokenSilently, isAuthenticated } = useAuth0();
    const [totals, setTotals] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = await getAccessTokenSilently({
                    audience: "https://ericnagtegaal.ca/api",
                });
                const res = await fetch("https://ericnagtegaal.ca/api/stats", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });
                const data = await res.json();

                // Group kills by user and date
                const grouped = {};
                const totalKillsByUser = {};

                data.forEach(({ username, match_date, total_kills }) => {
                    if (!grouped[username]) grouped[username] = {};
                    grouped[username][match_date] = total_kills;

                    totalKillsByUser[username] = (totalKillsByUser[username] || 0) + total_kills;
                });

                const allDates = [...new Set(data.map(row => row.match_date))].sort();

                // Prepare chart datasets
                const datasets = Object.entries(grouped).map(([username, stats], i) => {
                    let cumulative = 0;
                    return {
                        label: `User: ${username}`,
                        data: allDates.map(date => {
                            cumulative += stats[date] ?? 0;
                            return cumulative;
                        }),
                        borderColor: `hsl(${(i * 70) % 360}, 70%, 50%)`,
                        tension: 0.2,
                        fill: false,
                    };
                });

                setChartData({
                    labels: allDates,
                    datasets,
                });

                // Prepare totals array for the table (sorted descending by kills)
                const totalsArray = Object.entries(totalKillsByUser)
                    .map(([user_id, kills]) => ({ user_id, kills }))
                    .sort((a, b) => b.kills - a.kills);

                setTotals(totalsArray);
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
            {/* Table with totals */}
            <section className="relative min-h-screen py-10">
                <div className="container mx-auto px-5">
                    <div>
                        <p>
                            <h2 className="text-white sm:text-3xl mb-3 font-medium title-font">About Standings Stats</h2>
                            This pages shows the standings of players in this Fantasy League. Points are the sum of the kills that each Fantasy League player"s team"s players got in the turnament.
                            <br />
                            <br />
                        </p>
                    </div>
                    <table className="table-auto border border-gray-300">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 px-4 py-2">User ID</th>
                                <th className="border border-gray-300 px-4 py-2">Total Kills</th>
                            </tr>
                        </thead>
                        <tbody>
                            {totals.map(({ user_id, kills }) => (
                                <tr key={user_id}>
                                    <td className="border border-gray-300 px-4 py-2">{user_id}</td>
                                    <td className="border border-gray-300 px-4 py-2">{kills}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="mt-10">
                        <h1 className="text-white sm:text-3xl">Player points Over Time</h1>
                        {chartData ? <LineChart chartData={chartData} /> : <p>Loading...</p>}
                    </div>
                </div>
            </section>
        </main>
    );
}
