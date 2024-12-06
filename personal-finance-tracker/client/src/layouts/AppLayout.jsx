import React, { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import Hamburger from "../components/layout/Hamburger";
import "../styles/AppLayout.css";

function AppLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) {
    return (
      <div className="app-layout mobile">
        <Hamburger username="don2003" />
        <div className="mobile-content">{children}</div>
      </div>
    );
  }

  return (
    <div className="app-layout desktop">
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
