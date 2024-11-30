import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const IncomeTrendChart = () => {
  const [timeFrame, setTimeFrame] = useState("day");

  const trendData = {
    day: {
      labels: [
        "2024-11-25",
        "2024-11-26",
        "2024-11-27",
        "2024-11-28",
        "2024-11-29",
        "2024-11-30",
      ],
      income: [0, 0, 2000, 5000, 50000, 305200],
    },
    month: {
      labels: ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov"],
      income: [150000, 180000, 200000, 220000, 250000, 305200],
    },
    year: {
      labels: ["2019", "2020", "2021", "2022", "2023", "2024"],
      income: [500000, 800000, 1200000, 1500000, 2000000, 2500000],
    },
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "#94a3b8",
          callback: (value) => `₱${value.toLocaleString()}`,
        },
      },
      x: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "#94a3b8",
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "#94a3b8",
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `Income: ${new Intl.NumberFormat("en-PH", {
              style: "currency",
              currency: "PHP",
            }).format(context.raw)}`;
          },
        },
      },
    },
  };

  const data = {
    labels: trendData[timeFrame].labels,
    datasets: [
      {
        label: "Income",
        data: trendData[timeFrame].income,
        borderColor: "#4ade80",
        backgroundColor: "rgba(74, 222, 128, 0.5)",
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#4ade80",
      },
    ],
  };

  return (
    <div className="income-trend-container">
      <div className="income-trend-header">
        <h2>Income Trend</h2>
        <select
          value={timeFrame}
          onChange={(e) => setTimeFrame(e.target.value)}
          className="time-frame-select"
        >
          <option value="day">Daily</option>
          <option value="month">Monthly</option>
          <option value="year">Yearly</option>
        </select>
      </div>
      <div style={{ height: "400px", width: "100%" }}>
        <Line options={options} data={data} />
      </div>
    </div>
  );
};

export default IncomeTrendChart;
