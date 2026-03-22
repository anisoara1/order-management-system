import { useState } from "react";
import { loginUser, registerUser } from "../api/auth";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.css";

export default function LoginPage() {
  const navigate = useNavigate();

  const [mode, setMode] = useState("login"); // login sau register
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("client");
  const [message, setMessage] = useState("");

  // VALIDARE SIMPLĂ
  const validate = () => {
    if (!email.includes("@")) return "Email invalid";
    if (password.length < 6) return "Parola trebuie să aibă minim 6 caractere";
    return null;
  };

  // LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();

    const error = validate();
    if (error) return setMessage(error);

    try {
      const res = await loginUser({ email, password });
      const token = res.data.token;
      const role = res.data.role;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("email", email);

      if (role === "vendor") navigate("/vendor");
      else navigate("/client");
    } catch (err) {
      setMessage(err.response?.data?.error || "Eroare la autentificare");
    }
  };

  // REGISTER
  const handleRegister = async (e) => {
    e.preventDefault();

    const error = validate();
    if (error) return setMessage(error);

    try {
      await registerUser({ email, password, role });

      setMessage("Cont creat cu succes! Te poți autentifica.");
      navigate("/login");
    } catch (err) {
      setMessage(err.response?.data?.error || "Eroare la înregistrare");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2>{mode === "login" ? "Autentificare" : "Creează cont"}</h2>

        {mode === "login" ? (
          <form onSubmit={handleLogin}>
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

            <button>Login</button>
          </form>
        ) : (
          <form onSubmit={handleRegister}>
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

            <select onChange={(e) => setRole(e.target.value)}>
              <option value="client">Client</option>
              <option value="vendor">Comerciant</option>
            </select>

            <button>Înregistrare</button>
          </form>
        )}

        <p className="message">{message}</p>

        <button
          className="toggle-btn"
          onClick={() => setMode(mode === "login" ? "register" : "login")}
        >
          {mode === "login"
            ? "Nu ai cont? Creează unul"
            : "Ai deja cont? Autentifică-te"}
        </button>
      </div>
    </div>
  );
}
