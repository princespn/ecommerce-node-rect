import express from "express";
import Order from "../models/Order.js";
import User from "../models/User.js";

const router = express.Router();

function generateOrderNumber() {
  return "ORD-" + Math.floor(100000 + Math.random() * 900000).toString();
}

router.post("/create", async (req, res) => {
  try {
    const { user_id, items, address, payment_method, total } = req.body;

    // 1️⃣ Check user exists
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // 2️⃣ Create new order
    const newOrder = new Order({
      user_id,
      items,
      address,
      payment_method: payment_method || "cod",
      total,
      order_number: generateOrderNumber(),
    });

    await newOrder.save();

    return res.json({
      message: "Order created successfully",
      order_id: newOrder._id,
      order_number: newOrder.order_number,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

export default router;
