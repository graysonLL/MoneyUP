import React, { useState, useEffect } from "react";
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

const ExpenseTrendChart = ({ userId, expenses }) => {
  const [timeFrame, setTimeFrame] = useState("day");
  const [trendData, setTrendData] = useState({
    day: { labels: [], expenses: [] },
    month: { labels: [], expenses: [] },
    year: { labels: [], expenses: [] }
  });

  useEffect(() => {
    if (expenses && expenses.length > 0) {
      const processedData = processExpenseData(expenses);
      setTrendData(processedData);
    }
  }, [expenses]);

  const processExpenseData = (expenses) => {
    const now = new Date();
    const data = {
      day: { labels: [], expenses: [] },
      month: { labels: [], expenses: [] },
      year: { labels: [], expenses: [] }
    };

    // Process daily data (last 7 days)
    const dailyData = new Map();
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      dailyData.set(dateStr, 0);
    }

    // Process monthly data (last 6 months)
    const monthlyData = new Map();
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now);
      date.setMonth(date.getMonth() - i);
      const monthStr = date.toLocaleString('default', { month: 'short' });
      monthlyData.set(monthStr, 0);
    }

    // Process yearly data (last 6 years)
    const yearlyData = new Map();
    for (let i = 5; i >= 0; i--) {
      const year = now.getFullYear() - i;
      yearlyData.set(year.toString(), 0);
    }

    // Aggregate expense data
    expenses.forEach(expense => {
      const date = new Date(expense.date);
      const dateStr = date.toISOString().split('T')[0];
      const monthStr = date.toLocaleString('default', { month: 'short' });
      const yearStr = date.getFullYear().toString();

      if (dailyData.has(dateStr)) {
        dailyData.set(dateStr, (dailyData.get(dateStr) || 0) + Number(expense.amount));
      }
      if (monthlyData.has(monthStr)) {
        monthlyData.set(monthStr, (monthlyData.get(monthStr) || 0) + Number(expense.amount));
      }
      if (yearlyData.has(yearStr)) {
        yearlyData.set(yearStr, (yearlyData.get(yearStr) || 0) + Number(expense.amount));
      }
    });

    // Convert Maps to arrays for Chart.js
    data.day.labels = Array.from(dailyData.keys());
    data.day.expenses = Array.from(dailyData.values());
    data.month.labels = Array.from(monthlyData.keys());
    data.month.expenses = Array.from(monthlyData.values());
    data.year.labels = Array.from(yearlyData.keys());
    data.year.expenses = Array.from(yearlyData.values());

    return data;
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
