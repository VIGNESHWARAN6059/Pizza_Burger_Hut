import "../style/foodcart.css";

export default function FoodCard({ food, addToCart }) {
  const { name, price, image, type } = food;

  const typeSymbol =
    type === "Veg" ? (
      <span className="veg-symbol">🟢 Veg</span>
    ) : (
      <span className="nonveg-symbol">🔴 Non-Veg</span>
    );

  return (
    <div className="food-card">
      <img src={image} alt={name} className="food-image" />
      <div className="food-info">
        <h3>{name}</h3>
        <p>{typeSymbol}</p>
        <p>₹{price}</p>
        <button onClick={() => addToCart(food)}>Add to Cart</button>
      </div>
    </div>
  );
}
