const express = require("express");
const Event = require("../models/Event");
const auth = require("../middleware/auth");

const router = express.Router();


// =======================
// 📅 GET EVENTS (FEED + PAGINATION)
// =======================
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const events = await Event.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Event.countDocuments();

    res.json({
      success: true,
      page,
      totalPages: Math.ceil(total / limit),
      totalEvents: total,
      events
    });

  } catch (err) {
    res.json({
      success: false,
      error: err.message
    });
  }
});


// =======================
// 📅 CREATE EVENT (PROTECTED)
// =======================
router.post("/", auth, async (req, res) => {
  try {
    const { title, location, date, description } = req.body;

    // validation
    if (!title || !location || !date) {
      return res.status(400).json({
        success: false,
        message: "title, location, and date are required"
      });
    }

    // create event
    const newEvent = new Event({
      title,
      location,
      date,
      description,
      organiserId: req.user.id   // 🔐 real logged-in user
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
// =======================
// ❤️ LIKE EVENT
// =======================
router.post("/:id/like", auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.json({ success: false, message: "Event not found" });
    }

    // prevent duplicate likes
    if (event.likes.includes(req.user.id)) {
      return res.json({ success: false, message: "Already liked" });
    }

    event.likes.push(req.user.id);
    await event.save();

    res.json({
      success: true,
      message: "Event liked",
      likes: event.likes.length
    });

  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});// =======================
// 💔 UNLIKE EVENT
// =======================
router.post("/:id/unlike", auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.json({ success: false, message: "Event not found" });
    }

    event.likes = event.likes.filter(
      (userId) => userId !== req.user.id
    );

    await event.save();

    res.json({
      success: true,
      message: "Event unliked",
      likes: event.likes.length
    });

  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});
