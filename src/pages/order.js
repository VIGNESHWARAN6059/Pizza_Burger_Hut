import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import "../style/order.css";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
      } catch (err) {
        console.error("Failed to load orders", err);
      }
    };

    fetchOrders();
  }, [token]);

  return (
    <div className="orders-page">
      <h2>View orders</h2>
      {orders.length === 0 ? (
        <p>No orders placed yet.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order, index) => (
            <div key={index} className="order-card">
              <h4>Order #{index + 1}</h4>
              <ul>
                {order.items.map((item, i) => {
                  if (!item.food) return null; // Skip if food is null
                  return (
                    <li key={i} className="order-item">
                      <img
                        src={item.food.image}
                        alt={item.food.name}
                        className="order-food-img"
                      />
                      <div className="order-item-details">
                        <strong>{item.food.name}</strong> <br />
                        Qty: {item.quantity} × ₹{item.price} = ₹
                        {item.price * item.quantity}
                      </div>
                    </li>
                  );
                })}
              </ul>
              <p className="order-total">
                <strong>Total: ₹{order.totalAmount}</strong>
              </p>
              <p>Status: <span className={`status ${order.status.toLowerCase()}`}>{order.status}</span></p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
