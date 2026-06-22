const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    destination: {
      type: String,
      required: true,
      trim: true,
    },

    days: {
      type: Number,
      required: true,
    },

    budgetType: {
      type: String,
      enum: ["Low", "Medium", "High"],
      required: true,
    },

    interests: {
      type: [String], // ["Food", "Adventure"]
      required: true,
    },

    itinerary: {
      type: Object, // AI generated plan stored here
      default: {},
    },

    estimatedBudget: {
      type: Object, // AI budget breakdown
      default: {},
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Trip", tripSchema);