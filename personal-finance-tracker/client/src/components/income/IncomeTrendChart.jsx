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

const IncomeTrendChart = ({ userId, incomes }) => {
  const [timeFrame, setTimeFrame] = useState("day");
  const [trendData, setTrendData] = useState({
    day: { labels: [], income: [] },
    month: { labels: [], income: [] },
    year: { labels: [], income: [] }
  });

  useEffect(() => {
    if (incomes && incomes.length > 0) {
      const processedData = processIncomeData(incomes);
      setTrendData(processedData);
    }
  }, [incomes]);

  const processIncomeData = (incomes) => {
    const now = new Date();
    const data = {
      day: { labels: [], income: [] },
      month: { labels: [], income: [] },
      year: { labels: [], income: [] }
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

    // Aggregate income data
    incomes.forEach(income => {
      const date = new Date(income.date);
      const dateStr = date.toISOString().split('T')[0];
      const monthStr = date.toLocaleString('default', { month: 'short' });
      const yearStr = date.getFullYear().toString();

      if (dailyData.has(dateStr)) {
        dailyData.set(dateStr, (dailyData.get(dateStr) || 0) + Number(income.amount));
      }
      if (monthlyData.has(monthStr)) {
        monthlyData.set(monthStr, (monthlyData.get(monthStr) || 0) + Number(income.amount));
      }
      if (yearlyData.has(yearStr)) {
        yearlyData.set(yearStr, (yearlyData.get(yearStr) || 0) + Number(income.amount));
      }
    });

    // Convert Maps to arrays for Chart.js
    data.day.labels = Array.from(dailyData.keys());
    data.day.income = Array.from(dailyData.values());
    data.month.labels = Array.from(monthlyData.keys());
    data.month.income = Array.from(monthlyData.values());
    data.year.labels = Array.from(yearlyData.keys());
    data.year.income = Array.from(yearlyData.values());

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
