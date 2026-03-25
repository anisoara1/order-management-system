import { useEffect, useState } from "react";
import { getDashboard } from "../api/dashboard";
import "../styles/dashboard.css";

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboard()
      .then((data) => {
        console.log("Dashboard data:", data);
        setStats(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Dashboard error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading dashboard...</p>;
  if (!stats) return <p>Failed to load dashboard data</p>;

  return (
    <div className="dashboard">
      {/* CARDURI */}
      <div className="dashboard-grid">
        <div className="card">
          <h3>Total Products</h3>
          <p className="card-number">{stats.totalProducts}</p>
        </div>

        <div className="card">
          <h3>Total Orders</h3>
          <p className="card-number">{stats.totalOrders}</p>
        </div>

        <div className="card">
          <h3>New Orders</h3>
          <p className="card-number">{stats.newOrders}</p>
        </div>

        <div className="card">
          <h3>Total Revenue</h3>
          <p className="card-number">${stats.totalRevenue}</p>
        </div>
      </div>

      {/* TOP PRODUSE */}
      <div className="section">
        <h2>Top Products</h2>
        <div className="list">
          {stats.topProducts?.map((p) => (
            <div className="list-item" key={p.id}>
              <span>{p.name}</span>
              <span className="qty">{p.sold} sold</span>
            </div>
          ))}
        </div>
      </div>

      {/* COMENZI RECENTE */}
      <div className="section">
        <h2>Recent Orders</h2>
        <div className="list">
          {stats.recentOrders?.map((o) => (
            <div className="list-item" key={o.id}>
              <span>Order #{o.id}</span>
              <span>${o.total}</span>
            </div>
          ))}
        </div>
      </div>

      {/* LOW STOCK */}
      <div className="section">
        <h2>Low Stock Items</h2>
        <div className="list">
          {stats.lowStockItems?.map((item) => (
            <div className="list-item" key={item.id}>
              <span>{item.name}</span>
              <span className="qty">{item.stock} left</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
