import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar"
import Home from "./pages/home";
import Menu from "./pages/menu";
import Cart from "./pages/cart";
import Login from "./pages/login";
import Register from "./pages/register";
import Orders from "./pages/order";
import AdminPanel from "./pages/adminpanel";
import AddFood from "./pages/addfood";
import { useAuth } from "./context/AuthContext";

export default function App() {
  const { user } = useAuth();

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/orders" element={user ? <Orders /> : <Login />} />
        <Route path="/admin" element={user?.isAdmin ? <AdminPanel /> : <Login />} />
        <Route path="/admin/add-food" element={user?.isAdmin ? <AddFood /> : <Login />} />
      </Routes>
    </>
  );
}
