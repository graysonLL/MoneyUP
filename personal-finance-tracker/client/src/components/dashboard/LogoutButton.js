import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import React from "react";
import "../../styles/logoutButton.css";

const LogoutButton = ({ isCollapsed }) => {
  return (
    <button
      className={`logout-main ${
        isCollapsed ? "collapsed-item" : "expanded-item"
      }`}
      title={isCollapsed ? "Logout" : ""}
    >
      <ArrowLeftOnRectangleIcon
        className={`nav-item-icon ${!isCollapsed && "icon-expanded"}`}
      />
      {!isCollapsed && <span>Logout</span>}
    </button>
  );
};

export default LogoutButton;
