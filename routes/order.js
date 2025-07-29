const express = require("express");
const Order = require("../models/order");
const verifyToken = require("../middleware/auth");
const router = express.Router();

// ✅ Place an order (only logged-in users)
// ✅ Place an order (only logged-in users)
router.post("/", verifyToken, async (req, res) => {
  try {
    const { items } = req.body;

    // Calculate total amount
    const totalAmount = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const order = new Order({
      userId: req.user.id,
      items,
      totalAmount,
    });

    const saved = await order.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json("Failed to place order");
  }
});

// ✅ Get orders
// - Admin: all orders
// - User: only their orders
// ✅ Get orders
// - Admin: all orders
// - User: only their orders
router.get("/", verifyToken, async (req, res) => {
  try {
    let orders;

    if (req.user.isAdmin) {
      orders = await Order.find()
        .populate("userId")
        .populate("items.foodId"); // ✅ Populate food details
    } else {
      orders = await Order.find({ userId: req.user.id }).populate("items.foodId");
    }

    // Format items with embedded food details and quantity
    const formatted = orders.map((order) => ({
      _id: order._id,
      userId: order.userId,
      status: order.status,
      totalAmount: order.totalAmount,
      createdAt: order.createdAt,
      items: order.items.map((item) => ({
        food: item.foodId, // Full populated food details
        quantity: item.quantity,
        price: item.price,
      })),
    }));

    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).json("Server error");
  }
});


module.exports = router;
