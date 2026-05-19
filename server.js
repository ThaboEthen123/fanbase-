const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();console.log("JWT SECRET LOADED:", !!process.env.JWT_SECRET); FANBASE _SECRETE_2003

const authRoutes = require("./routes/auth");
const eventRoutes = require("./routes/events");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);

// Home route
app.get("/", (req, res) => {
  res.json({ message: "Fanbase API Running 🚀" });
});

// Debug route (VERY IMPORTANT)
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

// MongoDB connection (ONLY METHOD USED)
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log("MongoDB Error ❌", err));

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
