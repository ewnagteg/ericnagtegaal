
import { Chart, registerables } from "chart.js";
import React from "react";
import { Line } from "react-chartjs-2";
Chart.register(...registerables);

export default function LineChart({ chartData, options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { position: "top" },
        title: {
            display: true,
            text: "Line Chart"
        }
    },
    scales: {
        y: { beginAtZero: true }
    }
} }) {
    return (
            <Line
                data={chartData}
                options={{
                    options
                }}
            />
    );
};