const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { sendEmail } = require("./emailService");

// ==========================
// Signup Route (MongoDB based)
// ==========================
router.post(
  "/signup",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ ok: false, errors: errors.array() });
    }

    const { name, email, password } = req.body;
    try {
      let existing = await User.findOne({ email });
      if (existing) return res.status(409).json({ message: "Email already registered" });

      const user = await User.create({ name, email, password });
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "devsecret", { expiresIn: "7d" });
      res.status(201).json({
        success: true,
        user: { id: user._id, name: user.name, email: user.email },
        token,
      });
    } catch (err) {
      console.error("Signup error", err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// ==========================
// Login Route (MongoDB based)
// ==========================
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ ok: false, errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(401).json({ message: "Invalid credentials" });
      const match = await user.comparePassword(password);
      if (!match) return res.status(401).json({ message: "Invalid credentials" });
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "devsecret", { expiresIn: "7d" });
      res.json({
        success: true,
        user: { id: user._id, name: user.name, email: user.email },
        token,
      });
    } catch (err) {
      console.error("Login error", err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// ==========================
// Forgot Password Route
// ==========================
router.post(
  "/forgot-password",
  body("email").isEmail().withMessage("Valid email is required"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ ok: false, errors: errors.array() });
    }
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Generate secure token
    const token = crypto.randomBytes(32).toString("hex");
    const tokenExpiry = Date.now() + 3600000; // 1 hour

    user.resetPasswordToken = token;
    user.resetPasswordExpires = tokenExpiry;
    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${token}`;
    await sendEmail(
      user.email,
      "Password Reset",
      `Reset your password here: ${resetUrl}`
    );

    res.status(200).json({ message: "Password reset email sent" });
  } catch (err) {
    console.error("Forgot password error:", err);
    res.status(500).json({ message: "Server error" });
  }
  }
);

// ==========================
// Reset Password Route
// ==========================
router.post(
  "/reset-password/:token",
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  async (req, res) => {
  const { token } = req.params;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ ok: false, errors: errors.array() });
    }
  const { password } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user)
      return res.status(400).json({ message: "Invalid or expired token" });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Password has been reset successfully" });
  } catch (err) {
    console.error("Reset password error:", err);
    res.status(500).json({ message: "Server error" });
  }
  }
);

module.exports = router;
