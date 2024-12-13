import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const IncomeExpensesChart = ({ period, userId }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [incomeRes, expenseRes] = await Promise.all([
          axios.get(`http://localhost:3001/api/income/user/${userId}`),
          axios.get(`http://localhost:3001/api/expense/user/${userId}`)
        ]);

        const incomes = incomeRes.data;
        const expenses = expenseRes.data;

        let labels = [];
        let incomeData = [];
        let expenseData = [];

        if (period === 'monthly') {
          // Get current month's weeks
          const now = new Date();
          const currentMonth = now.getMonth();
          const currentYear = now.getFullYear();
          
          // Create week labels
          labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'];
          
          // Initialize data arrays
          incomeData = new Array(5).fill(0);
          expenseData = new Array(5).fill(0);

          // Process incomes
          incomes.forEach(income => {
            const date = new Date(income.date);
            if (date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
              const week = Math.ceil(date.getDate() / 7) - 1;
              if (week >= 0 && week < 5) {
                incomeData[week] += Number(income.amount);
              }
            }
          });

          // Process expenses
          expenses.forEach(expense => {
            const date = new Date(expense.date);
            if (date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
              const week = Math.ceil(date.getDate() / 7) - 1;
              if (week >= 0 && week < 5) {
                expenseData[week] += Number(expense.amount);
              }
            }
          });
        } else {
          // Yearly view - show months
          labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
          incomeData = new Array(12).fill(0);
          expenseData = new Array(12).fill(0);

          const currentYear = new Date().getFullYear();

          // Process incomes
          incomes.forEach(income => {
            const date = new Date(income.date);
            if (date.getFullYear() === currentYear) {
              incomeData[date.getMonth()] += Number(income.amount);
            }
          });

          // Process expenses
          expenses.forEach(expense => {
            const date = new Date(expense.date);
            if (date.getFullYear() === currentYear) {
              expenseData[date.getMonth()] += Number(expense.amount);
            }
          });
        }

        setChartData({
          labels,
          datasets: [
            {
              label: 'Income',
              data: incomeData,
              backgroundColor: 'rgba(74, 222, 128, 0.5)',
              borderColor: 'rgb(74, 222, 128)',
              borderWidth: 1
            },
            {
              label: 'Expenses',
              data: expenseData,
              backgroundColor: 'rgba(239, 68, 68, 0.5)',
              borderColor: 'rgb(239, 68, 68)',
              borderWidth: 1
            }
          ]
        });

      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId, period]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `₱${value.toLocaleString('en-PH')}`,
          color: '#94a3b8'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#94a3b8'
        }
      }
    },
    plugins: {
      legend: {
        position: 'bottom',
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
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('en-PH', {
                style: 'currency',
                currency: 'PHP'
              }).format(context.parsed.y);
            }
            return label;
          }
        }
      }
    }
  };

  return (
    <div style={{ height: '300px' }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default IncomeExpensesChart;
