import { NavLink } from "react-router-dom";
import "../styles/sidebar.css";

export default function Sidebar({ isOpen, closeSidebar }) {
  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-header">
        <h2 className="logo">MyShop</h2>
        <button className="close-btn" onClick={closeSidebar}>
          ×
        </button>
      </div>

      <nav className="sidebar-links">
        <NavLink to="/dashboard" onClick={closeSidebar}>
          <span className="icon">📊</span> Dashboard
        </NavLink>

        <NavLink to="/products" onClick={closeSidebar}>
          <span className="icon">📦</span> Products
        </NavLink>

        <NavLink to="/orders" onClick={closeSidebar}>
          <span className="icon">🧾</span> Orders
        </NavLink>
      </nav>
    </aside>
  );
}
