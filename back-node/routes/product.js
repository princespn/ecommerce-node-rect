import express from "express";

const router = express.Router();
import Product from "../models/Product.js";
import Category from "../models/Category.js";

//const Product = require("../model/Product.js");
//const Category = require("../model/Category.js");

// Get all products
router.get("/product", (req, res) => {
  Product.find()
    .then((products) => res.json([]))
    .catch((err) =>
      res.status(404).json({
        nopostsfound: "No product found",
      })
    );
});


router.get("/categories", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Get all products by specific category (case-insensitive)
router.get("/products/:cat_name", (req, res) => {
  const catName = req.params.cat_name.toLowerCase();

  Product.find({ routeName: catName })
    .then((products) => res.json(products))
    .catch((err) =>
      res.status(404).json({
        nocatsfound: "No product found",
      })
    );
});

//module.exports = router;
export default router;
