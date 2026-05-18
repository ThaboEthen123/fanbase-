const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: String, required: true },
    description: { type: String },

    organiserId: { type: String, required: true },

    // ❤️ LIKE SYSTEM
    likes: {
      type: [String],
      default: []
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
