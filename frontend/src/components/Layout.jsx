import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Închide sidebar-ul când se schimbă dimensiunea ecranului
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setSidebarOpen(true); // pe desktop rămâne deschis
      } else {
        setSidebarOpen(false); // pe mobil se retrage
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Închide sidebar-ul când utilizatorul apasă în afara lui
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        sidebarOpen &&
        window.innerWidth <= 768 &&
        !e.target.closest(".sidebar") &&
        !e.target.closest(".menu-btn")
      ) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [sidebarOpen]);

  return (
    <div className="layout">
      <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div className="main">
        <Sidebar
          isOpen={sidebarOpen}
          closeSidebar={() => setSidebarOpen(false)}
        />

        <div className="content">{children}</div>
      </div>
    </div>
  );
}
