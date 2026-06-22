const Trip = require("../models/Trip");
const { generateItinerary } = require("../services/aiService");

// ==========================
// CREATE TRIP
// ==========================
const createTrip = async (req, res) => {
  try {
    const { destination, days, budgetType, interests } = req.body;

    // Better validation (safe check for array too)
    if (
      !destination ||
      !days ||
      !budgetType ||
      !interests ||
      !Array.isArray(interests) ||
      interests.length === 0
    ) {
      return res.status(400).json({
        message: "Please provide all required fields correctly",
      });
    }

    const trip = await Trip.create({
      user: req.user._id,
      destination,
      days,
      budgetType,
      interests,
    });

    res.status(201).json({
      message: "Trip created successfully",
      trip,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// GET USER TRIPS
// ==========================
const getUserTrips = async (req, res) => {
  try {
    const trips = await Trip.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      count: trips.length,
      trips,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// AI GENERATE TRIP
// ==========================
const generateTripAI = async (req, res) => {
  try {
    const trip = await Trip.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found",
      });
    }

    // Call AI service
    const aiData = await generateItinerary(trip);

    if (!aiData) {
      return res.status(500).json({
        message: "AI generation failed",
      });
    }

    // Save AI response
    trip.itinerary = aiData.itinerary || {};
    trip.estimatedBudget = aiData.budget || {};

    await trip.save();

    res.status(200).json({
      message: "AI Trip generated successfully",
      trip,
      hotels: aiData.hotels || [],
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found",
      });
    }

    await Trip.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Trip deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


module.exports = {
  createTrip,
  getUserTrips,
  generateTripAI,
  deleteTrip,
};