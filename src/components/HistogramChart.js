import React from "react";
import BarChart from "./BarChart.js";

export default function HistogramChart({ chartData }) {
  const binSize = 4;
  const max = Math.max(...chartData);
  const min = Math.min(...chartData);
  const binCount = Math.ceil((max - min + 1) / binSize);

  const bins = new Array(binCount).fill(0);

  chartData.forEach((value) => {
    const binIndex = Math.floor((value - min) / binSize);
    bins[binIndex]++;
  });

  const labels = bins.map((_, i) => {
    const start = min + i * binSize;
    const end = start + binSize - 1;
    return `${start}-${end}`;
  });

  const newchartData = {
    labels,
    datasets: [
      {
        label: "Frequency",
        data: bins,
        backgroundColor: "#4B9CD3",
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: { display: true, text: "Range" },
      },
      y: {
        title: { display: true, text: "Count" },
        beginAtZero: true,
        ticks: { stepSize: 1 },
      },
    },
  };

  return <BarChart chartData={newchartData}/>;
};