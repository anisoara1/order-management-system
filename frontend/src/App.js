import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { ThemeProvider } from "./context/ThemeContext";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

import LoginPage from "./pages/LoginPage";
import AdminLoginPage from "./pages/AdminLoginPage";

import DashboardPage from "./pages/DashboardPage";
import AdminPage from "./pages/AdminPage";
import ClientPage from "./pages/ClientPage";
import VendorPage from "./pages/VendorPage";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* LOGIN PAGES (fără Layout) */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin-login" element={<AdminLoginPage />} />

          {/* REDIRECT DEFAULT */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* PROTECTED ROUTES (cu Layout) */}
          <Route path="/*" element={<Layout />}>
            <Route
              path="dashboard"
              element={
                <ProtectedRoute allowed={["client", "vendor", "admin"]}>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="admin"
              element={
                <ProtectedRoute allowed={["admin"]}>
                  <AdminPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="client"
              element={
                <ProtectedRoute allowed={["client"]}>
                  <ClientPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="vendor"
              element={
                <ProtectedRoute allowed={["vendor"]}>
                  <VendorPage />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
