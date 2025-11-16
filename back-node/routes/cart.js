import express from "express";
import Cart from "../models/Cart.js";

const router = express.Router();

// Add to cart
router.post("/cart/add", async (req, res) => {
  try {
    const { user_id, product } = req.body;

    let cart = await Cart.findOne({ user_id });

    if (!cart) {
      cart = new Cart({
        user_id,
        items: [{ ...product, quantity: 1 }],
      });

    } else {
      const index = cart.items.findIndex(
        (i) => i.product_id.toString() === product.product_id.toString()
      );

      if (index !== -1) {
        cart.items[index].quantity += 1;
      } else {
        cart.items.push({ ...product, quantity: 1 });
      }
    }

    await cart.save();
    res.json({ message: "Cart updated", cart });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE quantity
router.post("/cart/update", async (req, res) => {
    try {
      const { user_id, product_id, action } = req.body;
  
      const cart = await Cart.findOne({ user_id });
      if (!cart) return res.json({ items: [] });
  
      const index = cart.items.findIndex(i => i.product_id === product_id);
      if (index === -1) return res.json({ items: cart.items });
  
      if (action === "inc") {
        cart.items[index].quantity += 1;
      }
  
      if (action === "dec") {
        cart.items[index].quantity -= 1;
        if (cart.items[index].quantity <= 0) {
          cart.items.splice(index, 1);
        }
      }
  
      await cart.save();
      res.json({ items: cart.items });
  
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
// Remove item
router.delete("/cart/remove", async (req, res) => {
  try {
    const { user_id, product_id } = req.body;

    const cart = await Cart.findOne({ user_id });

    if (!cart) return res.json({ items: [] });

    cart.items = cart.items.filter(
      (i) => i.product_id.toString() !== product_id.toString()
    );

    await cart.save();
    res.json({ message: "Item removed", cart });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Clear cart
router.delete("/cart/clear/:user_id", async (req, res) => {
  try {
    await Cart.findOneAndDelete({ user_id: req.params.user_id });
    res.json({ message: "Cart cleared" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get cart
router.get("/cart/:user_id", async (req, res) => {
  try {
    const cart = await Cart.findOne({ user_id: req.params.user_id });
    res.json(cart || { items: [] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
