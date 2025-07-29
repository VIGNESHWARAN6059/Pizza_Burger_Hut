const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema({
  name: String,
  category: { type: String, enum: ["Burger", "Pizza"] },
  type: { type: String, enum: ["Veg", "Non-Veg"] },
  description: String,
  price: Number,
  image: String,
});

module.exports = mongoose.model("Food", FoodSchema);
