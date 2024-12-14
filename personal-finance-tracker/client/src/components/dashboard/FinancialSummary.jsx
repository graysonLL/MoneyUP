import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import "../../styles/FinancialSummary.css";

const FinancialSummary = () => {
  const { user } = useAuth();
  const [summary, setSummary] = useState({
    netSavings: 0,
    currentBalance: 0,
    totalExpenses: 0,
    lastTransaction: null,
  });

  useEffect(() => {
    const fetchFinancialData = async () => {
      try {
        const [incomeRes, expenseRes] = await Promise.all([
          axios.get(`http://localhost:3001/api/income/user/${user.id}`),
          axios.get(`http://localhost:3001/api/expense/user/${user.id}`),
        ]);

        const incomes = incomeRes.data;
        const expenses = expenseRes.data;

        // Calculate totals
        const totalIncome = incomes.reduce(
          (sum, income) => sum + Number(income.amount),
          0
        );
        const totalExpenses = expenses.reduce(
          (sum, expense) => sum + Number(expense.amount),
          0
        );

        // Net savings is total income (not affected by expenses)
        const netSavings = totalIncome;
        // Current balance is income minus expenses
        const currentBalance = totalIncome - totalExpenses;

        // Get last transaction
        const allTransactions = [
          ...incomes.map((i) => ({ ...i, type: "income" })),
          ...expenses.map((e) => ({ ...e, type: "expense" })),
        ].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        const lastTransaction = allTransactions[0];

        setSummary({
          netSavings,
          currentBalance,
          totalExpenses,
          lastTransaction: lastTransaction
            ? {
                amount: lastTransaction.amount,
                type: lastTransaction.type,
                time: new Date(lastTransaction.created_at).toLocaleTimeString(
                  "en-PH",
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                ),
              }
            : null,
        });
      } catch (error) {
        console.error("Error fetching financial data:", error);
      }
    };

    if (user?.id) {
      fetchFinancialData();
    }
  }, [user]);

  return (
    <div className="financial-summary">
      <div className="summary-card">
        <h2>Net Savings</h2>
        <div className="amount green">
          ₱
          {summary.netSavings.toLocaleString("en-PH", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </div>
      </div>

      <div className="summary-card-cur">
        <div className="summary-card-amount">
          <h2>Current Balance</h2>
        </div>
        <div className="summary-card-minus">
          <div className="amount blue">
            ₱
            {summary.currentBalance.toLocaleString("en-PH", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
          {summary.lastTransaction && (
            <div className="timestamp">
              {summary.lastTransaction.type === "expense" ? "-" : "+"}₱
              {Number(summary.lastTransaction.amount).toLocaleString("en-PH", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
              {summary.lastTransaction.time}
            </div>
          )}
        </div>
      </div>

      <div className="summary-card">
        <h2>Expenses</h2>
        <div className="amount red">
          ₱
          {summary.totalExpenses.toLocaleString("en-PH", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </div>
      </div>
    </div>
  );
};

export default FinancialSummary;
