import React from "react";
import "../styles/Goals.css";

const Goals = ({ isSidebarOpen }) => {
  return (
    <div className={`goals-content-wrapper ${!isSidebarOpen ? "sidebar-closed" : ""}`}>
      <div className="goals-container">
        <div className="goals-header">
          <h1>Financial Goals</h1>
          <div className="goals-header-right">
            <div className="current-balance">
              <span className="balance-label">Current Balance:</span>
              <span className="balance-amount">₱0.00</span>
            </div>
            <button className="add-goal-btn">+ Add Goal</button>
          </div>
        </div>

        <div className="coming-soon-banner">
          <h2>🚧 Upcoming Feature: Goals Tracking 🚧</h2>
          <p>This feature is coming soon! Stay tuned.</p>
        </div>

        <div className="goals-grid">
          {/* Goals will be displayed here */}
        </div>
      </div>
    </div>
  );
};

export default Goals;
