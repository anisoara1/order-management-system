import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function Navbar({ toggleSidebar }) {
  const { setTheme } = useContext(ThemeContext);

  return (
    <nav className="navbar">
      <button className="menu-btn" onClick={toggleSidebar}>
        ☰
      </button>

      <div className="theme-buttons">
        <button onClick={() => setTheme("light")}>Light</button>
        <button onClick={() => setTheme("dark")}>Dark</button>
        <button onClick={() => setTheme("colorful")}>Colorful</button>
      </div>
    </nav>
  );
}
