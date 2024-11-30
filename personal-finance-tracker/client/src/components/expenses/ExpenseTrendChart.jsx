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

const ExpenseTrendChart = () => {
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
      expenses: [0, 500, 1000, 750, 1200, 1500],
    },
    month: {
      labels: ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov"],
      expenses: [15000, 18000, 20000, 22000, 25000, 30000],
    },
    year: {
      labels: ["2019", "2020", "2021", "2022", "2023", "2024"],
      expenses: [50000, 80000, 120000, 150000, 200000, 250000],
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
            return `Expenses: ${new Intl.NumberFormat("en-PH", {
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
        label: "Expenses",
        data: trendData[timeFrame].expenses,
        borderColor: "#ef4444",
        backgroundColor: "rgba(239, 68, 68, 0.5)",
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#ef4444",
      },
    ],
  };

  return (
    <div className="expense-trend-container">
      <div className="expense-trend-header">
        <h2>Expense Trend</h2>
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

export default ExpenseTrendChart;
