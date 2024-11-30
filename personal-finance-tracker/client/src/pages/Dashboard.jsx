import React from "react";
import LowBalanceWarning from "../components/dashboard/LowBalanceWarning";
import FinancialSummary from "../components/dashboard/FinancialSummary";
import RecentUpdates from "../components/dashboard/RecentUpdates";
import "../styles/Dashboard.css";

const Dashboard = ({ isSidebarOpen }) => {
  const currentBalance = 900;

  return (
    <div className={`dashboard ${isSidebarOpen ? "" : "sidebar-closed"}`}>
      <div className="dashboard-content">
        <LowBalanceWarning currentBalance={currentBalance} />
        <FinancialSummary />
        <RecentUpdates />
      </div>
    </div>
  );
};

export default Dashboard;
