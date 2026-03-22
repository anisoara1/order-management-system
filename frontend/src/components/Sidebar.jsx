import { Link } from "react-router-dom";

export default function Sidebar({ isOpen, closeSidebar }) {
  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <ul>
        <li>
          <Link to="/" onClick={closeSidebar}>
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/products" onClick={closeSidebar}>
            Produse
          </Link>
        </li>
        <li>
          <Link to="/customers" onClick={closeSidebar}>
            Clienți
          </Link>
        </li>
        <li>
          <Link to="/orders" onClick={closeSidebar}>
            Comenzi
          </Link>
        </li>
      </ul>
    </aside>
  );
}
