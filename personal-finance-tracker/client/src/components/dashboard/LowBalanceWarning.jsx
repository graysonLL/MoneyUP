import React from "react";
import "../../styles/LowBalanceWarning.css";

const LowBalanceWarning = ({ currentBalance, threshold = 1000 }) => {
  if (currentBalance > threshold) return null;

  return (
    <div className="warning-container">
      <div className="warning-content">
        <span className="warning-icon">⚠️</span>
        <span className="warning-text">
          Your balance is below your minimum threshold of ₱
          {threshold.toLocaleString()}.00
        </span>
        <button className="close-button">×</button>
      </div>
    </div>
  );
};

export default LowBalanceWarning;
