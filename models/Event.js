const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: String, required: true },

    // optional fields (NOT required anymore)
    description: { type: String, default: "" },
    organiserId: { type: String, default: "system" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
