import express from "express";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

const router = express.Router();

// CREATE ORDER
router.post("/order/create", async (req, res) => {
  try {
    const { user_id, address } = req.body;

    const cart = await Cart.findOne({ user_id });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    const totalAmount = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const order = new Order({
      user_id,
      items: cart.items,
      address,
      totalAmount,
    });

    await order.save();

    // Clear cart after order
    await Cart.findOneAndDelete({ user_id });

    res.json({
      message: "Order created",
      order_id: order._id,
      totalAmount,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET ORDER DETAILS
router.get("/order/:id", async (req, res) => {
  const order = await Order.findById(req.params.id);
  res.json(order);
});

export default router;
