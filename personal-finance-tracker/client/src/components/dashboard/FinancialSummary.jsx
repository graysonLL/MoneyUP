import React from "react";
import "../../styles/FinancialSummary.css";

const FinancialSummary = () => {
  return (
    <div className="financial-summary">
      <div className="summary-card">
        <h2>Net Savings</h2>
        <div className="amount green">₱5,200.00</div>
      </div>

      <div className="summary-card-cur">
        <div className="summary-card-amount">
          <h2>Current Balance</h2>
        </div>
        <div className="summary-card-minus">
          <div className="amount orange">₱3,700.00</div>
          <div className="timestamp">-₱1000.00 10:18 AM</div>
        </div>
      </div>

      <div className="summary-card">
        <h2>Expenses</h2>
        <div className="amount red">₱1,500.00</div>
      </div>
    </div>
  );
};

export default FinancialSummary;
