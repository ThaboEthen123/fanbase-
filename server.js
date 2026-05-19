require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const eventRoutes = require("./routes/events");

const app = express();

app.use(cors());
app.use(express.json());

/* =========================
   DEBUG STARTUP
========================= */
console.log("🚀 SERVER STARTING...");
console.log("JWT LOADED:", !!process.env.JWT_SECRET);
console.log("MONGO LOADED:", !!process.env.MONGODB_URI);

/* =========================
   ROUTES
========================= */
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);

app.get("/", (req, res) => {
  res.json({ success: true, message: "Fanbase API Running 🚀" });
});

/* =========================
   DATABASE + SERVER START
========================= */
async function startServer() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI missing");
    }

    console.log("⏳ Connecting to MongoDB...");

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("✅ MongoDB connected");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error("❌ SERVER CRASH:");
    console.error(err.message);
    process.exit(1);
  }
}

startServer();
