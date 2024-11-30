import React, { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import "../styles/AppLayout.css";

function AppLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="app-layout">
      <Navbar
        username="don2003"
        className={isSidebarOpen ? "" : "sidebar-closed"}
      />
      <div className="main-container">
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

        {React.cloneElement(children, { isSidebarOpen })}
      </div>
    </div>
  );
}

export default AppLayout;
