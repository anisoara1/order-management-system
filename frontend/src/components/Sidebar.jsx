import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Sidebar({ isOpen, closeSidebar }) {
  const [role, setRole] = useState(localStorage.getItem("role"));

  useEffect(() => {
    const updateRole = () => {
      setRole(localStorage.getItem("role"));
    };

    window.addEventListener("storage", updateRole);
    return () => window.removeEventListener("storage", updateRole);
  }, []);

  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <ul>
        {role === "admin" && (
          <>
            <li>
              <Link to="/admin" onClick={closeSidebar}>
                Admin Dashboard
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
          </>
        )}

        {role === "vendor" && (
          <>
            <li>
              <Link to="/vendor" onClick={closeSidebar}>
                Panou Vânzător
              </Link>
            </li>
            <li>
              <Link to="/products" onClick={closeSidebar}>
                Produsele mele
              </Link>
            </li>
            <li>
              <Link to="/orders" onClick={closeSidebar}>
                Comenzi primite
              </Link>
            </li>
          </>
        )}

        {role === "client" && (
          <>
            <li>
              <Link to="/client" onClick={closeSidebar}>
                Contul meu
              </Link>
            </li>
            <li>
              <Link to="/orders" onClick={closeSidebar}>
                Comenzile mele
              </Link>
            </li>
          </>
        )}
      </ul>
    </aside>
  );
}
