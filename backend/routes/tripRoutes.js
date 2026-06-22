const express = require("express");

const {
  createTrip,
  getUserTrips,
  generateTripAI,
  deleteTrip,
} = require("../controllers/tripController");

const protect = require("../middleware/auth");

const router = express.Router();

router.post("/", protect, createTrip);
router.get("/", protect, getUserTrips);
router.post("/:id/generate", protect, generateTripAI);
router.delete("/:id", protect, deleteTrip);

module.exports = router;
