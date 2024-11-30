import React from "react";
import "../styles/Expenses.css";

function Expenses() {
  const expenseData = [
    {
      amount: "+₱200.00",
      description: "dfgh",
      category: "Business",
      date: "11/30/2024",
    },
    {
      amount: "+₱5,000.00",
      description: "Initial Balance",
      category: "Investments",
      date: "11/30/2024",
    },
  ];

  return (
    <div className="expense-container">
      <div className="expense-header">
        <h1>Expenses</h1>
        <button className="add-expense-btn">+ Add Expense</button>
      </div>

      <div className="expense-table-container">
        <table className="expense-table">
          <thead>
            <tr>
              <th>Amount</th>
              <th>Description</th>
              <th>Category</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {expenseData.map((expense, index) => (
              <tr key={index}>
                <td className="amount">{expense.amount}</td>
                <td>{expense.description}</td>
                <td>{expense.category}</td>
                <td>{expense.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Expenses;
