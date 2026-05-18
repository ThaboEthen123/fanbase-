const express = require("express");
const router = express.Router();

const Event = require("../models/Event");
const auth = require("../middleware/auth");

// =====================
// CREATE EVENT
// =====================
router.post("/", auth, async (req, res) => {
  try {
    const { title, location, date, description } = req.body;

    const event = new Event({
      title,
      location,
      date,
      description,
      organiserId: req.user.id,
      likes: [],
      comments: []
    });

    await event.save();

    res.json({
      success: true,
      message: "Event created successfully",
      event
    });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});

// =====================
// GET EVENTS (FEED)
// =====================
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const events = await Event.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
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
    res.json({ success: false, error: err.message });
  }
});

// =====================
// LIKE EVENT
// =====================
router.post("/:id/like", auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event.likes.includes(req.user.id)) {
      event.likes.push(req.user.id);
      await event.save();
    }

    res.json({ success: true, message: "Liked" });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});

// =====================
// COMMENT EVENT
// =====================
router.post("/:id/comment", auth, async (req, res) => {
  try {
    const { text } = req.body;

    const event = await Event.findById(req.params.id);

    event.comments.push({
      userId: req.user.id,
      text,
      createdAt: new Date()
    });

    await event.save();

    res.json({
      success: true,
      message: "Comment added",
      comments: event.comments
    });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});

module.exports = router;
