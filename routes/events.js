const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const auth = require("../middleware/auth");


// =======================
// 📅 CREATE EVENT (PROTECTED)
// =======================
router.post("/", auth, async (req, res) => {
  try {
    const { title, location, date, description } = req.body;

    if (!title || !location || !date) {
      return res.json({
        success: false,
        message: "Missing required fields"
      });
    }

    const newEvent = new Event({
      title,
      location,
      date,
      description,
      organiserId: req.user.id
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


// =======================
// 📥 GET EVENTS (FEED + PAGINATION)
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
// ❤️ LIKE EVENT (TOGGLE)
// =======================
router.post("/:id/like", auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.json({ success: false, message: "Event not found" });
    }

    const userId = req.user.id;

    if (event.likes.includes(userId)) {
      event.likes = event.likes.filter(id => id !== userId);
      await event.save();

      return res.json({
        success: true,
        message: "Unliked event"
      });
    }

    event.likes.push(userId);
    await event.save();

    res.json({
      success: true,
      message: "Liked event"
    });

  } catch (err) {
    res.json({
      success: false,
      error: err.message
    });
  }
});


// =======================
// 💬 ADD COMMENT
// =======================
router.post("/:id/comment", auth, async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.json({
        success: false,
        message: "Comment text required"
      });
    }

    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.json({
        success: false,
        message: "Event not found"
      });
    }

    const comment = {
      userId: req.user.id,
      text,
      createdAt: new Date()
    };

    event.comments.push(comment);
    await event.save();

    res.json({
      success: true,
      message: "Comment added",
      comments: event.comments
    });

  } catch (err) {
    res.json({
      success: false,
      error: err.message
    });
  }
});


// =======================
// 📥 GET COMMENTS
// =======================
router.get("/:id/comments", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.json({
        success: false,
        message: "Event not found"
      });
    }

    res.json({
      success: true,
      comments: event.comments
    });

  } catch (err) {
    res.json({
      success: false,
      error: err.message
    });
  }
});


module.exports = router;
