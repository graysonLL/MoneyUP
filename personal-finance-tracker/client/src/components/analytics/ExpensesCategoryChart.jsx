import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const ExpensesCategoryChart = ({ period, userId }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: [],
      borderColor: [],
      borderWidth: 1
    }]
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const expenseRes = await axios.get(`http://localhost:3001/api/expense/user/${userId}`);
        const expenses = expenseRes.data;

        // Filter expenses based on period
        const now = new Date();
        const filteredExpenses = expenses.filter(expense => {
          const expenseDate = new Date(expense.date);
          if (period === 'monthly') {
            return expenseDate.getMonth() === now.getMonth() &&
                   expenseDate.getFullYear() === now.getFullYear();
          } else {
            return expenseDate.getFullYear() === now.getFullYear();
          }
        });

        // Group expenses by category
        const categoryTotals = filteredExpenses.reduce((acc, expense) => {
          const categoryName = expense.category.name;
          acc[categoryName] = (acc[categoryName] || 0) + Number(expense.amount);
          return acc;
        }, {});

        // Sort categories by amount (descending)
        const sortedCategories = Object.entries(categoryTotals)
          .sort(([, a], [, b]) => b - a);

        // Generate colors
        const colors = generateColors(sortedCategories.length);

        setChartData({
          labels: sortedCategories.map(([category]) => category),
          datasets: [{
            data: sortedCategories.map(([, amount]) => amount),
            backgroundColor: colors.background,
            borderColor: colors.border,
            borderWidth: 1
          }]
        });

      } catch (error) {
        console.error('Error fetching expense category data:', error);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId, period]);

  const generateColors = (count) => {
    const colors = {
      background: [],
      border: []
    };
    
    const baseColors = [
      { r: 239, g: 68, b: 68 },    // Red
      { r: 249, g: 115, b: 22 },   // Orange
      { r: 234, g: 179, b: 8 },    // Yellow
      { r: 34, g: 197, b: 94 },    // Green
      { r: 6, g: 182, b: 212 },    // Cyan
      { r: 59, g: 130, b: 246 },   // Blue
      { r: 168, g: 85, b: 247 },   // Purple
      { r: 236, g: 72, b: 153 }    // Pink
    ];

    for (let i = 0; i < count; i++) {
      const color = baseColors[i % baseColors.length];
      colors.background.push(`rgba(${color.r}, ${color.g}, ${color.b}, 0.5)`);
      colors.border.push(`rgb(${color.r}, ${color.g}, ${color.b})`);
    }

    return colors;
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: '#94a3b8',
          padding: 20,
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const total = context.dataset.data.reduce((sum, value) => sum + value, 0);
            const value = context.raw;
            const percentage = ((value / total) * 100).toFixed(1);
            return `${context.label}: ${new Intl.NumberFormat('en-PH', {
              style: 'currency',
              currency: 'PHP'
            }).format(value)} (${percentage}%)`;
          }
        }
      }
    }
  };

  return (
    <div style={{ height: '300px' }}>
      {chartData.datasets[0].data.length > 0 ? (
        <Doughnut data={chartData} options={options} />
      ) : (
        <div style={{ 
          height: '100%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: '#94a3b8'
        }}>
          No expense data available
        </div>
      )}
    </div>
  );
};

export default ExpensesCategoryChart;
