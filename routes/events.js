const express = require("express");
const router = express.Router();
const Event = require("../models/Event");

// ✅ GET ALL EVENTS
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      events
    });

  } catch (err) {
    res.json({
      success: false,
      error: err.message
    });
  }
});

// ✅ CREATE EVENT (NEW)
router.post("/", async (req, res) => {
  try {
    const { title, location, date } = req.body;

    // basic validation
    if (!title || !location || !date) {
      return res.json({
        success: false,
        message: "Please fill all fields"
      });
    }

    const newEvent = new Event({
      title,
      location,
      date
    });

    await newEvent.save();

    res.json({
      success: true,
      message: "Event created successfully",
      event: newEvent
    });

  } catch (err) {
    res.json({
      success: false,
      error: err.message
    });
  }
});

module.exports = router;
