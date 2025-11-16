import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { registerValidation, loginValidation } from "../validation.js";

const router = express.Router();


router.post("/register", async (req, res) => {
  try {
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      name: req.body.fullname,
      email: req.body.email,
      mobile: req.body.mobile,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully", userId: newUser._id });
  } catch (err) {
    console.error("Register Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * @route   POST /api/v1/user/login
 * @desc    User login
 */
router.post("/login", async (req, res) => {
  try {
    // Validate request
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    // Find user
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ message: "User does not exist" });

    // Check password
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).json({ message: "Invalid email or password" });

    // Create JWT token
    const token = jwt.sign({ id: user._id }, process.env.SECRET_OR_KEY, {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    });

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Login Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
