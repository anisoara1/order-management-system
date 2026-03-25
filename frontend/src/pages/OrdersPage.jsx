import { useEffect, useState } from "react";
import api from "../api/api";
import "../styles/orders.css";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/orders")
      .then((res) => {
        console.log("Orders from backend:", res.data);
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Orders error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading orders...</p>;

  return (
    <div className="orders-page">
      <h2 className="page-title">Orders</h2>

      <div className="orders-list">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div className="order-card" key={order.id}>
              <div className="order-info">
                <h3>Order #{order.id}</h3>
                <p className="customer">Customer: {order.customerName}</p>
                <p className="total">Total: ${order.total}</p>
              </div>

              <span className={`status ${order.status}`}>{order.status}</span>
            </div>
          ))
        ) : (
          <p>No orders found</p>
        )}
      </div>
    </div>
  );
}
