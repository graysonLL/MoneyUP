import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpensesCategoryChart = () => {
  // Sample data - replace with your actual data
  const expensesByCategory = [
    { category: "Utilities", amount: 1000 },
    { category: "Entertainment", amount: 500 },
    // Add more categories as needed
  ];

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
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

  const doughnutData = {
    labels: expensesByCategory.map((cat) => cat.category),
    datasets: [
      {
        label: "Expenses",
        data: expensesByCategory.map((cat) => cat.amount),
        backgroundColor: [
          "#8b5cf6", // purple-500
          "#6366f1", // indigo-500
          "#3b82f6", // blue-500
          "#0ea5e9", // sky-500
          "#06b6d4", // cyan-500
          "#14b8a6", // teal-500
          "#10b981", // emerald-500
          "#22c55e", // green-500
        ],
        borderWidth: 1,
      },
    ],
  };

  const doughnutOptions = {
    ...chartOptions,
    plugins: {
      ...chartOptions.plugins,
      legend: {
        ...chartOptions.plugins.legend,
        position: "right",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const value = context.raw;
            return `${context.label}: ${new Intl.NumberFormat("en-PH", {
              style: "currency",
              currency: "PHP",
            }).format(value)}`;
          },
        },
      },
    },
  };

  return (
    <div style={{ height: "350px", width: "100%", marginTop: "2rem" }}>
      <Pie data={doughnutData} options={doughnutOptions} />
    </div>
  );
};

export default ExpensesCategoryChart;
