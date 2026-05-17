const express = require("express");
const router = express.Router();

const Event = require("../models/Event");

// GET EVENTS
router.get("/", async (req, res) => {

  try {

    const events = await Event.find().sort({
      createdAt: -1
    });

    res.json({
      success:true,
      events
    });

  } catch(err){

    res.status(500).json({
      error: err.message
    });

  }

});

// CREATE EVENT
router.post("/", async (req, res) => {

  try {

    const event = await Event.create(req.body);

    res.json({
      success:true,
      event
    });

  } catch(err){

    res.status(500).json({
      error: err.message
    });

  }

});

module.exports = router;
