import React from "react";
import "../styles/Income.css";

function Income() {
  const incomeData = [
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
    <div className="income-container">
      <div className="income-header">
        <h1>Income</h1>
        <button className="add-income-btn">+ Add Income</button>
      </div>

      <div className="income-table-container">
        <table className="income-table">
          <thead>
            <tr>
              <th>Amount</th>
              <th>Description</th>
              <th>Category</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {incomeData.map((income, index) => (
              <tr key={index}>
                <td className="amount">{income.amount}</td>
                <td>{income.description}</td>
                <td>{income.category}</td>
                <td>{income.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Income;
