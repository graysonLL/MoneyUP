import React from "react";
import "../../styles/FinancialMetric.css";

function FinancialMetric({ title, value, type }) {
  const getColorClass = () => {
    switch (type) {
      case "income":
        return "metric-income";
      case "expense":
        return "metric-expense";
      case "savings":
        return "metric-savings";
      case "rate":
        return "metric-rate";
      default:
        return "";
    }
  };

  return (
    <div className={`metric-card ${getColorClass()}`}>
      <h3>{title}</h3>
      <div className="metric-value">{value}</div>
    </div>
  );
}

export default FinancialMetric;
