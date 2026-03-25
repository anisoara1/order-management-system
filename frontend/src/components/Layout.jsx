import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import "../styles/layout.css";

export default function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="layout">
      <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />

      <div
        className="content"
        onClick={() => {
          if (isSidebarOpen) closeSidebar();
        }}
      >
        <Navbar toggleSidebar={toggleSidebar} />

        <div className="page-content">{children}</div>
      </div>
    </div>
  );
}
