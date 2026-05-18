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
},

comments: [
  {
    userId: String,
    text: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }
]
module.exports = mongoose.model("Event", eventSchema);
