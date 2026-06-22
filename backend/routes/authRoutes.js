const express = require("express");

const {
  registerUser,
  loginUser,
} = require("../controllers/authController");

const protect = require("../middleware/auth");

const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected route
router.get("/profile", protect, (req, res) => {
  res.json({
    message: "Profile data fetched successfully",
    user: req.user,
  });
});

module.exports = router;