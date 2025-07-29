import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import "../style/addfood.css"

export default function AddFood() {
    const { token } = useAuth();
    const [form, setForm] = useState({
        name: "",
        category: "",
        type: "",
        price: "",
        image: ""
    });

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/foods", form, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert("Food added successfully!");
            setForm({ name: "", category: "", type: "", price: "", image: "" });
        } catch (err) {
            alert("Failed to add food.");
        }
    };

    return (
        <div className="add-food">
            <h2>Add New Food</h2>
            <form onSubmit={handleSubmit} className="food-form">
                <input
                    type="text"
                    name="name"
                    placeholder="Food Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                />
                <select name="category" value={form.category} onChange={handleChange} required>
                    <option value="">Select Category</option>
                    <option value="Burger">Burger</option>
                    <option value="Pizza">Pizza</option>
                </select>

                <select name="type" value={form.type} onChange={handleChange} required>
                    <option value="">Select Type</option>
                    <option value="Veg">Veg</option>
                    <option value="Non-Veg">Non-Veg</option>
                </select>
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={form.price}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="image"
                    placeholder="Image URL (optional)"
                    value={form.image}
                    onChange={handleChange}
                />
                <button type="submit">Add Food</button>
            </form>
        </div>
    );
}
