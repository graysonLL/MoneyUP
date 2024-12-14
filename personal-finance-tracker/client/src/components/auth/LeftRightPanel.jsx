import React from "react";
import "../../styles/LeftRightPanel.css";
const LeftRightPanel = ({ children }) => {
  return (
    <div className="container">
      {children.logo}
      <div className="leftPanel">{children.leftPanel}</div>
      {children.rightPanel && <div className="rightPanel">{children.rightPanel}</div>}
    </div>
  );
};

export default LeftRightPanel;
