const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ======================
// DATABASE CONNECTION
// ======================
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log("DB Error ❌", err));

// ======================
// MODEL
// ======================
const Event = require("./models/Event");

// ======================
// ROUTES
// ======================

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Fanbase API Running 🚀" });
});

// GET ALL EVENTS
app.get("/api/events", async (req, res) => {
  try {
    const events = await Event.find();
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

// DEBUG ROUTE (IMPORTANT)
app.get("/debug-db", async (req, res) => {
  try {
    const dbName = mongoose.connection.db.databaseName;
    const collections = await mongoose.connection.db.listCollections().toArray();

    res.json({
      db: dbName,
      collections: collections.map(c => c.name)
    });
  } catch (err) {
    res.json({ error: err.message });
  }
});

// ======================
// START SERVER
// ======================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Fanbase running on port ${PORT}`);
});
