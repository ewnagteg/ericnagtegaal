
import { Chart, registerables } from "chart.js";
import React from "react";// components/BarChart.js
import { Line } from "react-chartjs-2";
Chart.register(...registerables);

export default function LineChart({ chartData }) {
    return (
        <div className="chart-container" style={{
            width: "100%",
            backgroundColor: "white",
        }}>
            <h2 style={{ textAlign: "center" }}></h2>
            <Line
                data={chartData}
                options={{

                }}
            />
        </div>
    );
};