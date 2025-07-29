import { useEffect, useState } from "react";
import axios from "axios";
import FoodCard from "../components/foodcart";
import "../style/menu.css";

export default function Menu() {
  const [foods, setFoods] = useState([]);
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");

  const getFoods = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/foods", {
        params: { category, type },
      });
      setFoods(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getFoods();
  }, [category, type]);

  const addToCart = (food) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find((item) => item._id === food._id);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ ...food, qty: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Item added to cart!");
  };

  return (
    <div className="menu-page">
      <h2>Browse Menu</h2>

      <div className="filters">
        <select onChange={(e) => setCategory(e.target.value)} value={category}>
          <option value="">All Categories</option>
          <option value="Burger">Burger</option>
          <option value="Pizza">Pizza</option>
        </select>
        <select onChange={(e) => setType(e.target.value)} value={type}>
          <option value="">All Types</option>
          <option value="Veg">Veg</option>
          <option value="Non-Veg">Non-Veg</option>
        </select>
      </div>

      <div className="food-list">
        {foods.map((food) => (
          <FoodCard key={food._id} food={food} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
}
