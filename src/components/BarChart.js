
import { Chart, registerables } from "chart.js";
import React from "react";
import { Bar } from "react-chartjs-2";

Chart.register(...registerables);

export default function BarChart({ chartData, options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { position: "top" },
        title: {
            display: true,
            text: "Bar Chart"
        }
    },
    scales: {
        y: { beginAtZero: true }
    },
} }) {
    return (
            <Bar
                data={chartData}
                options={options}
            />
    );
};