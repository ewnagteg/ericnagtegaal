import React, { useEffect, useState } from "react";
import LineChart from "../LineChart.js";
import BarChart from "../BarChart.js";
import VLNavBar from "./VLNavBar.js";
import { useAuth0 } from "@auth0/auth0-react";
import { fetchWithAuth } from "../../api/fetchWithAuth";

export default function StatsPage() {
    const [chartData, setChartData] = useState(null);
    const [predsData, setPredsData] = useState(null);
    const { getAccessTokenSilently, isAuthenticated } = useAuth0();
    const [totals, setTotals] = useState([]);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await fetchWithAuth({ getAccessTokenSilently, url: "/stats" });

                // group kills by user and date
                const grouped = {};
                const totalKillsByUser = {};

                data.forEach(({ username, match_date, total_kills }) => {
                    if (!grouped[username]) grouped[username] = {};
                    grouped[username][match_date] = total_kills;

                    totalKillsByUser[username] = (totalKillsByUser[username] || 0) + total_kills;
                });

                const allDates = [...new Set(data.map(row => row.match_date))].sort();

                // prepare chart datasets
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

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await fetchWithAuth({ getAccessTokenSilently, url: "/preds" });
                data.sort((a, b) => new Date(b.date) - new Date(a.date));
                const predsChart = JSON.parse(data[0].chart_data);
                setPredsData(predsChart);
            } catch (err) {
                console.error("Failed to fetch stats:", err);
            }
        };
        if (isAuthenticated) {
            fetchStats();
        }
    }, [getAccessTokenSilently, isAuthenticated]);

    return (
        <main id="top" className="text-gray-400 bg-gray-900 body-font">
            <VLNavBar />
            {/* Table with totals */}
            <section className="relative min-h-screen py-10">
                <div className="container mx-auto px-5">
                    <div>
                        <div>
                            <h2 className="text-white sm:text-3xl mb-3 font-medium title-font">About Standings Stats</h2>
                            This pages shows the standings of players in this Fantasy League. Points are the sum of the kills that each Fantasy League player"s team"s players got in the turnament.
                            <br />
                            <br />
                        </div>
                    </div>
                    <table className="table-auto border border-gray-300">
                        <thead>
                            <tr className="bg-gray-600">
                                <th className="border border-gray-300 px-4 py-2 text-white font-bold">User ID</th>
                                <th className="border border-gray-300 px-4 py-2 text-white font-bold">Total Kills</th>
                            </tr>
                        </thead>
                        <tbody>
                            {totals.map(({ user_id, kills }, index) => (
                                <tr key={user_id} className={`hover:bg-gray-700  ${index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800'} `}>
                                    <td className="border border-gray-300 px-4 py-2">{user_id}</td>
                                    <td className="border border-gray-300 px-4 py-2">{kills}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="mt-10">
                        <div className="min-h-[400px] w-full p-2 bg-gray-800">
                            {predsData ? <BarChart chartData={predsData} options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: { position: 'top' },
                                    title: {
                                        display: true,
                                        text: 'Projected Fantasy Point Distribution'
                                    }
                                },
                                scales: {
                                    y: {
                                        ticks: {
                                            callback: function (value) {
                                                return 100 * value + '%';
                                            }
                                        },
                                        beginAtZero: true
                                    }
                                }
                            }} /> : <p>Loading...</p>}
                        </div>
                        <div className="min-h-[400px] w-full p-2 bg-gray-800">
                            {chartData ? <LineChart chartData={chartData} options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: { position: 'top' },
                                    title: {
                                        display: true,
                                        text: 'Fantasy Points Standings Over Time'
                                    }
                                },
                                scales: {
                                    y: {
                                        beginAtZero: true
                                    }
                                }
                            }} /> : <p>Loading...</p>}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
