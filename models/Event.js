const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: String, required: true },
    description: { type: String, default: "" },

    organiserId: { type: String, required: true },

    likes: { type: [String], default: [] },

    comments: {
      type: [
        {
          userId: String,
          text: String,
          createdAt: { type: Date, default: Date.now }
        }
      ],
      default: []
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
