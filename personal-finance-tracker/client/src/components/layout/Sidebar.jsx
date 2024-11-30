import {
  HomeIcon,
  ChartPieIcon,
  UserIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import React from "react";
import "../../styles/sidebar.css";
import LogoutButton from "./LogoutButton";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", icon: HomeIcon, path: "/dashboard" },
    { name: "Expenses", icon: ChartPieIcon, path: "/expenses" },
    { name: "Balance", icon: ChartPieIcon, path: "/balance" },
    { name: "Transactions", icon: ChartPieIcon, path: "/transactions" },
    { name: "Summaries", icon: ChartPieIcon, path: "/summaries" },
    { name: "Profile", icon: UserIcon, path: "/profile" },
  ];

  const handleCollapseToggle = () => {
    setIsCollapsed(!isCollapsed);
    if (!isCollapsed) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  return (
    <div
      className={`sidebar ${isOpen ? "open" : "closed"} ${
        isCollapsed ? "collapsed" : "expanded"
      }`}
    >
      <div className={`sidebar-logo ${isCollapsed ? "collapsed-logo" : ""}`}>
        {isCollapsed ? (
          <span className="logo-highlight">M</span>
        ) : (
          <>
            Money<span className="logo-highlight">Up</span>
          </>
        )}
      </div>
      <button onClick={handleCollapseToggle} className="collapse-btn">
        {isCollapsed ? (
          <ChevronRightIcon className="icon" />
        ) : (
          <ChevronLeftIcon className="icon" />
        )}
      </button>

      <div className="sidebar-content">
        <nav className="nav">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`nav-item ${
                isCollapsed ? "collapsed-item" : "expanded-item"
              } ${location.pathname === item.path ? "active-item" : ""}`}
              title={isCollapsed ? item.name : ""}
            >
              <item.icon
                className={`nav-item-icon ${!isCollapsed && "icon-expanded"}`}
              />
              {!isCollapsed && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>

        <div className="logout-container">
          <LogoutButton isCollapsed={isCollapsed} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
