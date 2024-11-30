import React from "react";
import FinancialMetric from "../components/analytics/FinancialMetric";
import IncomeExpensesChart from "../components/analytics/IncomeExpensesChart";
import ExpensesCategoryChart from "../components/analytics/ExpensesCategoryChart";
import TrendChart from "../components/analytics/TrendChart";
import "../styles/Analytics.css";

function Analytics({ isSidebarOpen }) {
  return (
    <div
      className={`analytics-container ${
        !isSidebarOpen ? "sidebar-closed" : ""
      }`}
    >
      <div className="analytics-content-container">
        <div className="analytics-header">
          <h1>Financial Analytics</h1>
          <select className="period-select" defaultValue="monthly">
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>

        <div className="metrics-grid">
          <FinancialMetric
            title="Total Income"
            value="₱305,200.00"
            type="income"
          />
          <FinancialMetric
            title="Total Expenses"
            value="₱1,500.00"
            type="expense"
          />
          <FinancialMetric
            title="Net Savings"
            value="₱303,700.00"
            type="savings"
          />
          <FinancialMetric title="Savings Rate" value="99.5%" type="rate" />
        </div>

        <div className="charts-grid">
          <div className="chart-container">
            <h2>Income vs Expenses</h2>
            <IncomeExpensesChart />
          </div>
          <div className="chart-container">
            <h2>Expenses by Category</h2>
            <ExpensesCategoryChart />
          </div>
          <div className="trend-container">
            <TrendChart />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
