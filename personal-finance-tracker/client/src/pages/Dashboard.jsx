import React from "react";
import FinancialSummary from "../components/dashboard/FinancialSummary";
import RecentUpdates from "../components/dashboard/RecentUpdates";
import "../styles/Dashboard.css";

const Dashboard = ({ isSidebarOpen }) => {
  return (
    <div className={`dashboard ${isSidebarOpen ? "" : "sidebar-closed"}`}>
      <div className="dashboard-content">
        <FinancialSummary />
        <RecentUpdates />
      </div>
    </div>
  );
};

export default Dashboard;
