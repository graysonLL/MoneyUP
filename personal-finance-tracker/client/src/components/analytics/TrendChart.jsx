import React from "react";
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

const TrendChart = () => {
  // Sample data - replace with your actual data
  const trendData = {
    labels: [
      "2024-11-25",
      "2024-11-26",
      "2024-11-27",
      "2024-11-28",
      "2024-11-29",
      "2024-11-30",
    ],
    income: [0, 0, 2000, 0, 5000, 305200],
    expenses: [1500, 300, 0, 3250, 0, 1000],
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
        position: "bottom",
        labels: {
          color: "#94a3b8",
          padding: 20,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat("en-PH", {
                style: "currency",
                currency: "PHP",
              }).format(context.parsed.y);
            }
            return label;
          },
        },
      },
    },
  };

  const data = {
    labels: trendData.labels,
    datasets: [
      {
        label: "Income",
        data: trendData.income,
        borderColor: "#4ade80",
        backgroundColor: "rgba(74, 222, 128, 0.5)",
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#4ade80",
      },
      {
        label: "Expenses",
        data: trendData.expenses,
        borderColor: "#ef4444",
        backgroundColor: "rgba(239, 68, 68, 0.5)",
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#ef4444",
      },
    ],
  };

  return (
    <div className="trend-chart-container">
      <h2>Income & Expenses Trend</h2>
      <div
        style={{
          height: "400px",
          width: "100%",
          marginTop: "2rem",
          marginBottom: "5rem",
        }}
      >
        <Line options={options} data={data} />
      </div>
    </div>
  );
};

export default TrendChart;
