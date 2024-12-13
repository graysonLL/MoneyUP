import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const TrendChart = ({ period, userId }) => {
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

        let timeLabels = [];
        let incomeData = [];
        let expenseData = [];
        let netData = [];

        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth();

        if (period === 'monthly') {
          // Get days in current month
          const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
          timeLabels = Array.from({ length: daysInMonth }, (_, i) => i + 1);
          incomeData = new Array(daysInMonth).fill(0);
          expenseData = new Array(daysInMonth).fill(0);

          // Process incomes
          incomes.forEach(income => {
            const date = new Date(income.date);
            if (date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
              incomeData[date.getDate() - 1] += Number(income.amount);
            }
          });

          // Process expenses
          expenses.forEach(expense => {
            const date = new Date(expense.date);
            if (date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
              expenseData[date.getDate() - 1] += Number(expense.amount);
            }
          });
        } else {
          // Yearly view - show months
          timeLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
          incomeData = new Array(12).fill(0);
          expenseData = new Array(12).fill(0);

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

        // Calculate cumulative net savings
        let runningNet = 0;
        netData = incomeData.map((income, index) => {
          runningNet += income - expenseData[index];
          return runningNet;
        });

        setChartData({
          labels: timeLabels,
          datasets: [
            {
              label: 'Income',
              data: incomeData,
              borderColor: 'rgb(74, 222, 128)',
              backgroundColor: 'rgba(74, 222, 128, 0.1)',
              tension: 0.4,
              fill: false
            },
            {
              label: 'Expenses',
              data: expenseData,
              borderColor: 'rgb(239, 68, 68)',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              tension: 0.4,
              fill: false
            },
            {
              label: 'Net Trend',
              data: netData,
              borderColor: 'rgb(59, 130, 246)',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              tension: 0.4,
              fill: true
            }
          ]
        });

      } catch (error) {
        console.error('Error fetching trend data:', error);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId, period]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: 'index'
    },
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
        position: 'top',
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
      {chartData.labels.length > 0 ? (
        <Line data={chartData} options={options} />
      ) : (
        <div style={{ 
          height: '100%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: '#94a3b8'
        }}>
          No trend data available
        </div>
      )}
    </div>
  );
};

export default TrendChart;
