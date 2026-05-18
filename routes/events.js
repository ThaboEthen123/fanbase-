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
