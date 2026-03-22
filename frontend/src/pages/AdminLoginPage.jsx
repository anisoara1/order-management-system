import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.css";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleAdminLogin = (e) => {
    e.preventDefault();
    console.log("ADMIN EMAIL:", process.env.REACT_APP_ADMIN_EMAIL);
    console.log("ADMIN PASS:", process.env.REACT_APP_ADMIN_PASSWORD);

    const adminEmail = process.env.REACT_APP_ADMIN_EMAIL;
    const adminPassword = process.env.REACT_APP_ADMIN_PASSWORD;

    if (email === adminEmail && password === adminPassword) {
      console.log("LOGIN ADMIN REUȘIT!");

      localStorage.setItem("token", "admin-token");
      localStorage.setItem("role", "admin");
      localStorage.setItem("email", email);

      console.log("TOKEN SETAT:", localStorage.getItem("token"));
      console.log("ROL SETAT:", localStorage.getItem("role"));
      console.log("ÎNCERC SĂ NAVIGHEZ...");
      navigate("/admin");
      console.log("AM ÎNCERCAT SĂ NAVIGHEZ");
      navigate("/admin");
    } else {
      setMessage("Email sau parolă incorectă pentru administrator.");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2>Admin Login</h2>

        <form onSubmit={handleAdminLogin}>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Parola"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button>Login Admin</button>
        </form>

        <p className="message">{message}</p>
      </div>
    </div>
  );
}
