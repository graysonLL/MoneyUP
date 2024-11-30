import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const IncomeExpensesChart = () => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
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
          display: false,
        },
        ticks: {
          color: "#94a3b8",
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#94a3b8",
          padding: 20,
          font: {
            size: 12,
          },
        },
      },
    },
  };

  const data = {
    labels: ["2024-11"],
    datasets: [
      {
        label: "Income",
        data: [305200],
        backgroundColor: "#4ade80",
        borderRadius: 6,
      },
      {
        label: "Expenses",
        data: [1500],
        backgroundColor: "#ef4444",
        borderRadius: 6,
      },
    ],
  };

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <Bar options={options} data={data} />
    </div>
  );
};

export default IncomeExpensesChart;
