import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function Navbar({ toggleSidebar }) {
  const { setTheme } = useContext(ThemeContext);

  const role = localStorage.getItem("role");
  const email = localStorage.getItem("email");

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

      <div className="welcome">
        {role && email && (
          <span>
            Bine ai venit, {role}: {email}
          </span>
        )}
      </div>
    </nav>
  );
}
