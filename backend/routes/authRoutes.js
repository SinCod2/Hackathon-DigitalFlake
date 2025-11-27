const express = require("express");
const { body } = require("express-validator");
const {
  register,
  login,
  forgotPassword,
  resetPassword,
  getMe,
} = require("../controllers/authController");
const { protect } = require("../middleware/auth");

const router = express.Router();

// Validation middleware
const registerValidation = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Please provide a valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

const loginValidation = [
  body("email").isEmail().withMessage("Please provide a valid email"),
  body("password").notEmpty().withMessage("Password is required"),
];

// Routes
router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:resetToken", resetPassword);
router.get("/me", protect, getMe);

module.exports = router;
