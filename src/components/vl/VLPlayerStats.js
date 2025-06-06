import React, { useEffect, useState } from "react";
import LineChart from "../LineChart.js";
import HistogramChart from "../HistogramChart.js";
import VLNavBar from "./VLNavBar.js";
import { useAuth0 } from "@auth0/auth0-react";
import { fetchWithAuth } from "../../api/fetchWithAuth";
import { useParams } from "react-router-dom";

export default function VLPlayerStats() {
    const [chartData, setChartData] = useState(null);
    const [histChartData, setHistChartData] = useState(null);
    const { getAccessTokenSilently, isAuthenticated } = useAuth0();
    const { playerId } = useParams();
    useEffect(() => {
        const fetchStats = async () => {
            try {
                const rows = await fetchWithAuth({ getAccessTokenSilently, url: `/playerstats/${playerId}` });

                rows.sort((a, b) => new Date(a.date) - new Date(b.date));
                const statKeys = ["Kills", "Assists", "Deaths"];

                // x axis labels, remove "Champions Tour 2025: "
                const labels = rows.map(row =>
                    `${row.Tournament.substring(21)}, ${row.Stage}, ${row.Match_Type}`
                );

                const datasets = statKeys.map((statKey, i) => {
                    return {
                        label: statKey,
                        data: rows.map(row => row[statKey] ?? 0),
                        borderColor: `hsl(${(i * 120) % 360}, 70%, 50%)`, // gives 3 distinct colors
                        tension: 0.2,
                        fill: false,
                    };
                });

                setHistChartData(rows.map(row => row.Kills ?? 0));
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
            <section className="relative min-h-screen py-10">
                <div className="container mx-auto px-5">
                    <h1 className="text-white sm:text-3xl">Player stats</h1>
                    <div className="mt-10 h-full">
                        <div className="m-2 p-12">
                            <h1 className="text-white sm:text-2xl">{playerId} Kills Over Time</h1>
                            <div className="max-h-[400px] w-full p-2 bg-gray-800">
                                {chartData ? <LineChart chartData={chartData} /> : <p>Loading...</p>}
                            </div>
                        </div>
                        <div className="m-2 p-12">
                            <h1 className="text-white sm:text-2xl">{playerId} histogram of Kills</h1>
                            <div className="max-h-[400px] w-full p-2 bg-gray-800">
                                {histChartData ? <HistogramChart chartData={histChartData} /> : <p>Loading...</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
