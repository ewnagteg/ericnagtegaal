
import { Chart, registerables } from "chart.js";
import React from "react";// components/BarChart.js
import { BarChart } from "react-chartjs-2";
Chart.register(...registerables);

export default function BarChart({ chartData }) {
    return (
        <div className="chart-container" style={{
            width: "100%",
            backgroundColor: "white",
        }}>
            <h2 style={{ textAlign: "center" }}></h2>
            <BarChart
                data={chartData}
                options={{

                }}
            />
        </div>
    );
};