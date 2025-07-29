import { Link } from "react-router-dom";
import "../style/home.css";

export default function Home() {
  return (
    <div className="home">
      <div className="hero">
        <h1>Delicious Burgers & Pizzas</h1>
        <p>Order your favorites, served hot & fresh 🍕</p>
        <Link to="/menu" className="hero-btn">Explore Menu</Link>
      </div>
      <div className="home-categories">
        <div className="category-card veg">
          <h3>Veg</h3>
          <p>Pure vegetarian delights</p>
        </div>
        <div className="category-card nonveg">
          <h3>Non-Veg</h3>
          <p>Juicy, meaty and delicious</p>
        </div>
      </div>
    </div>
  );
}
