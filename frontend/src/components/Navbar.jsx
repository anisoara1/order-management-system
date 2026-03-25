import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import "../styles/navbar.css";

export default function Navbar({ toggleSidebar }) {
  const { setTheme } = useContext(ThemeContext);

  return (
    <header className="navbar">
      <button className="menu-btn" onClick={toggleSidebar}>
        ☰
      </button>

      <h1 className="navbar-title">MyShop Dashboard</h1>

      <div className="theme-buttons">
        <button onClick={() => setTheme("light")}>☀️</button>
        <button onClick={() => setTheme("dark")}>🌙</button>
        <button onClick={() => setTheme("colorful")}>🎨</button>
      </div>
    </header>
  );
}
