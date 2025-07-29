import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../style/cart.css";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const { token, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) setCart(JSON.parse(stored));
  }, []);

  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const increaseQty = (index) => {
    const newCart = [...cart];
    newCart[index].qty += 1;
    updateCart(newCart);
  };

  const decreaseQty = (index) => {
    const newCart = [...cart];
    if (newCart[index].qty > 1) {
      newCart[index].qty -= 1;
      updateCart(newCart);
    }
  };

  const removeItem = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    updateCart(newCart);
  };

  const placeOrder = async () => {
    if (!user) return navigate("/login");

    try {
      const payload = {
        items: cart.map((item) => ({
          foodId: item._id,          // The food's MongoDB _id
          quantity: item.qty || 1,   // Quantity from cart
          price: item.price,         // Price at order time
        })),
      };

      const res = await axios.post(
        "http://localhost:5000/api/orders",
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      localStorage.removeItem("cart");
      setCart([]);
      alert("Order placed!");
    } catch (err) {
      console.error(err);
      alert("Order failed!");
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="cart-page">
      <h2>🛒 Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item, index) => (
              <div key={index} className="cart-item">
                <img
                  src={item.image || "https://via.placeholder.com/100"}
                  alt={item.name}
                />
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p>
                    ₹{item.price} × {item.qty}
                  </p>
                  <div className="qty-control">
                    <button onClick={() => decreaseQty(index)}>-</button>
                    <span>{item.qty}</span>
                    <button onClick={() => increaseQty(index)}>+</button>
                  </div>
                  <button
                    onClick={() => removeItem(index)}
                    className="remove-btn"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h3>Total: ₹{total}</h3>
            <button className="order-btn" onClick={placeOrder}>
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
}
