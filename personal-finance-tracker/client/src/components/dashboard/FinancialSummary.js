import React from "react";
import "../../styles/financialSummary.css";

const FinancialSummary = () => {
  return (
    <div className="financial-summary">
      <div className="summary-item net-balance">
        <h3>Net Balance</h3>
        <p>₱5,000.00</p>
      </div>
      <div className="summary-item current-balance">
        <h3>Current Balance</h3>
        <p>₱4,750.00</p>
        <span>-₱250.00 11:05 PM</span>
      </div>
      <div className="summary-item expenses">
        <h3>Expenses</h3>
        <p>₱250.00</p>
      </div>
    </div>
  );
};

export default FinancialSummary;
