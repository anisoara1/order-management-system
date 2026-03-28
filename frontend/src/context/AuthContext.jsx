import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [id, setId] = useState(localStorage.getItem("id"));

  const login = (token, email, id) => {
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
    localStorage.setItem("id", id);

    setToken(token);
    setEmail(email);
    setId(id);
  };

  const logout = () => {
    localStorage.clear();
    setToken(null);
    setEmail(null);
    setId(null);
  };

  return (
    <AuthContext.Provider value={{ token, email, id, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
