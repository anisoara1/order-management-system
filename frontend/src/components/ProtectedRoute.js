import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { token } = useContext(AuthContext);

  // dacă nu există token → redirect la login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
