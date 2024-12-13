import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useAuth } from "../contexts/AuthContext";
import FinancialMetric from "../components/analytics/FinancialMetric";
import IncomeExpensesChart from "../components/analytics/IncomeExpensesChart";
import ExpensesCategoryChart from "../components/analytics/ExpensesCategoryChart";
import TrendChart from "../components/analytics/TrendChart";
import "../styles/Analytics.css";

function Analytics({ isSidebarOpen }) {
  const { user } = useAuth();
  const [period, setPeriod] = useState('monthly');
  const [metrics, setMetrics] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    netSavings: 0,
    savingsRate: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFinancialData = async () => {
      try {
        setLoading(true);
        const [incomeRes, expenseRes] = await Promise.all([
          axios.get(`http://localhost:3001/api/income/user/${user.id}`),
          axios.get(`http://localhost:3001/api/expense/user/${user.id}`)
        ]);

        const incomes = incomeRes.data;
        const expenses = expenseRes.data;

        // Filter data based on selected period
        const now = new Date();
        const filteredIncomes = incomes.filter(income => {
          const incomeDate = new Date(income.date);
          if (period === 'monthly') {
            return incomeDate.getMonth() === now.getMonth() &&
                   incomeDate.getFullYear() === now.getFullYear();
          } else {
            return incomeDate.getFullYear() === now.getFullYear();
          }
        });

        const filteredExpenses = expenses.filter(expense => {
          const expenseDate = new Date(expense.date);
          if (period === 'monthly') {
            return expenseDate.getMonth() === now.getMonth() &&
                   expenseDate.getFullYear() === now.getFullYear();
          } else {
            return expenseDate.getFullYear() === now.getFullYear();
          }
        });

        // Calculate metrics
        const totalIncome = filteredIncomes.reduce((sum, income) => 
          sum + Number(income.amount), 0
        );
        const totalExpenses = filteredExpenses.reduce((sum, expense) => 
          sum + Number(expense.amount), 0
        );
        
        // Net savings is now current balance (income - expenses)
        const netSavings = totalIncome - totalExpenses;
        
        // Savings rate calculation remains the same
        const savingsRate = totalIncome > 0 
          ? ((totalIncome - totalExpenses) / totalIncome * 100)
          : 0;

        setMetrics({
          totalIncome,
          totalExpenses,
          netSavings,
          savingsRate
        });

      } catch (error) {
        console.error('Error fetching financial data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchFinancialData();
    }
  }, [user, period]);

  const handlePeriodChange = (e) => {
    setPeriod(e.target.value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`analytics-container ${!isSidebarOpen ? "sidebar-closed" : ""}`}>
      <div className="analytics-content-container">
        <div className="analytics-header">
          <h1>Financial Analytics</h1>
          <select 
            className="period-select" 
            value={period}
            onChange={handlePeriodChange}
          >
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>

        <div className="metrics-grid">
          <FinancialMetric
            title="Total Income"
            value={`₱${metrics.totalIncome.toLocaleString('en-PH', { 
              minimumFractionDigits: 2, 
              maximumFractionDigits: 2 
            })}`}
            type="income"
          />
          <FinancialMetric
            title="Total Expenses"
            value={`₱${metrics.totalExpenses.toLocaleString('en-PH', { 
              minimumFractionDigits: 2, 
              maximumFractionDigits: 2 
            })}`}
            type="expense"
          />
          <FinancialMetric
            title="Current Balance"
            value={`₱${metrics.netSavings.toLocaleString('en-PH', { 
              minimumFractionDigits: 2, 
              maximumFractionDigits: 2 
            })}`}
            type="savings"
          />
          <FinancialMetric 
            title="Savings Rate" 
            value={`${metrics.savingsRate.toFixed(1)}%`}
            type="rate" 
          />
        </div>

        <div className="charts-grid">
          <div className="chart-container">
            <h2>Income vs Expenses</h2>
            <IncomeExpensesChart 
              period={period}
              userId={user.id}
            />
          </div>
          <div className="chart-container">
            <h2>Expenses by Category</h2>
            <ExpensesCategoryChart 
              period={period}
              userId={user.id}
            />
          </div>
          <div className="trend-container">
            <TrendChart 
              period={period}
              userId={user.id}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
