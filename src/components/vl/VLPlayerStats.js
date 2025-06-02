// components/StatsPage.js
import React, { useEffect, useState } from "react";
import LineChart from "../LineChart.js";
import VLNavBar from "./VLNavBar.js";
import { useAuth0 } from "@auth0/auth0-react";
import { fetchWithAuth, fetchWithAuthPost } from "../../api/fetchWithAuth";
import { useParams } from "react-router-dom";

export default function VLPlayerStats() {
    const [chartData, setChartData] = useState(null);
    const { getAccessTokenSilently, isAuthenticated } = useAuth0();
    const { playerId } = useParams();
    useEffect(() => {
        const fetchStats = async () => {
            try {
                // could make this a get request
                const rows = await fetchWithAuth({ getAccessTokenSilently, url: `/playerstats/${playerId}` });

                const statKeys = ["Kills", "Assists", "Deaths"];

                // x axis labels, remove "Champions Tour 2025: "
                const labels = rows.map(row =>
                `${row.Tournament.substring(21)}, ${row.Stage}, ${row.Match_Type}`
                );

                // Create datasets for each stat
                const datasets = statKeys.map((statKey, i) => {
                return {
                    label: statKey,
                    data: rows.map(row => row[statKey] ?? 0),
                    borderColor: `hsl(${(i * 120) % 360}, 70%, 50%)`, // gives 3 distinct colors
                    tension: 0.2,
                    fill: false,
                };
                });

                // Set the chart data
                setChartData({
                labels,
                datasets,
                });

                // Set the chart data
                setChartData({
                    labels,
                    datasets,
                });

            } catch (err) {
                console.error("Failed to fetch stats:", err);
            }
        };
        if (isAuthenticated) {
            fetchStats();
        }
    }, [getAccessTokenSilently, isAuthenticated, playerId]);

    return (
        <main className="text-gray-400 bg-gray-900 body-font">
            <VLNavBar />
            {/* Table with totals */}
            <section className="relative min-h-screen py-10">
                <div className="container mx-auto px-5">
                    <div>
                        <h2 className="text-white sm:text-3xl mb-3 font-medium title-font">Player: </h2>
                        <p>
                            This pages shows the standings of players in this Fantasy League. Points are the sum of the kills that each Fantasy League player"s team"s players got in the turnament.
                            <br />
                            <br />
                        </p>
                    </div>
                    <div className="mt-10">
                        <h1 className="text-white sm:text-3xl">Player points Over Time</h1>
                        {chartData ? <LineChart chartData={chartData} /> : <p>Loading...</p>}
                    </div>
                </div>
            </section>
        </main>
    );
}
