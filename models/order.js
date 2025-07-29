const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: [
    {
      foodId: { type: mongoose.Schema.Types.ObjectId, ref: "Food" },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }, // Price at time of order
    },
  ],
  totalAmount: { type: Number, required: true },
  status: { type: String, default: "Pending" },
});

module.exports = mongoose.model("Order", OrderSchema);
