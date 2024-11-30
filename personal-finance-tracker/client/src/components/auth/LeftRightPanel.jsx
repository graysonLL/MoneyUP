import React from "react";
import "../../styles/LeftRightPanel.css";
const LeftRightPanel = ({ children }) => {
  return (
    <div className="container">
      {/* Left Section */}
      <div className="leftPanel">{children.leftPanel}</div>

      {/* Right Section */}
      <div className="rightPanel">{children.rightPanel}</div>
    </div>
  );
};

export default LeftRightPanel;
