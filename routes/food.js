const express = require("express");
const Food = require("../models/food");
const verifyToken = require("../middleware/auth");
const router = express.Router();

// Get all
router.get("/", async (req, res) => {
  const { category, type } = req.query;
  let filter = {};
  if (category) filter.category = category;
  if (type) filter.type = type;
  const foods = await Food.find(filter);
  res.json(foods);
});

// GET single food by ID
router.get("/:id", async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) return res.status(404).json("Food not found");
    res.json(food);
  } catch (err) {
    res.status(500).json(err);
  }
});


// Admin add food
router.post("/", verifyToken, async (req, res) => {
  if (!req.user.isAdmin) return res.status(403).json("Admin only");
  const food = new Food(req.body);
  const saved = await food.save();
  res.status(201).json(saved);
});

module.exports = router;
