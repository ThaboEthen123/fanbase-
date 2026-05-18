router.post("/", auth, async (req, res) => {
  try {
    const { title, location, date, description } = req.body;

    if (!title || !location || !date) {
      return res.json({
        success: false,
        message: "Missing fields"
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
