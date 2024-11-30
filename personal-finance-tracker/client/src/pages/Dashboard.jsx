import React, { useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import FinancialSummary from "../components/dashboard/FinancialSummary";
import RecentUpdates from "../components/dashboard/RecentUpdates";
import "../styles/dashboard.css";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="dashboard-container">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div
        className={`dashboard-content ${
          isSidebarOpen ? "open-sidebar" : "closed-sidebar"
        }`}
      >
        <FinancialSummary />
        <RecentUpdates />
      </div>
    </div>
  );
};
export default Dashboard;
