import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ allowed, children }) {
  console.log("ROLE:", localStorage.getItem("role"));
  console.log("TOKEN:", localStorage.getItem("token"));

  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  if (!token || !allowed.includes(role)) {
    return <Navigate to="/login" />;
  }

  return children;
}
