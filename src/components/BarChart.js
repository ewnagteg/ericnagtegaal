
import { Chart, registerables } from "chart.js";
import React from "react";
import { Bar } from "react-chartjs-2";

Chart.register(...registerables);

export default function BarChart({ chartData }) {
    return (
        <div className="chart-container" style={{
            width: "100%",
            backgroundColor: "white",
        }}>
            <h2 style={{ textAlign: "center" }}></h2>
            <Bar
                data={chartData}
                options={{
                }}
            />
        </div>
    );
};