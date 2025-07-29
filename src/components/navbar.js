import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../style/navbar.css";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">🍔 Pizza Burger Hut</Link>
      </div>
      <div className="navbar-center">
        <Link to="/menu">Menu</Link>
        <Link to="/cart">Cart</Link>
        {user && <Link to="/orders">My Orders</Link>}
        {user?.isAdmin && <Link to="/admin">Admin</Link>}
      </div>
      <div className="navbar-right">
        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <span>Hello, {user?.name?.split(" ")[0]}</span>
            <button onClick={logout} className="logout-btn">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}
