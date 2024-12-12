import React, { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import { useAuth } from '../contexts/AuthContext';

import Hamburger from "../components/layout/Hamburger";
import "../styles/AppLayout.css";

function AppLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const {user} = useAuth();
  const fullName = user.firstName + " "+user.lastName;
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
      <Hamburger username={fullName} />
        <div className="mobile-content">{children}</div>
      </div>
    );
  }

  return (
    <div className="app-layout desktop">
      <Navbar
        username={fullName}
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
