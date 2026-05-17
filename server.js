const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());

// ================= API ROUTES =================
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));

// ================= FRONTEND ROOT =================
// THIS FIXES ALL "Cannot GET /pages/..." ERRORS
const frontendPath = path.join(__dirname, "frontend");

app.use(express.static(frontendPath));

// FORCE ROOT PAGE
app.get("/", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// OPTIONAL SAFETY: direct page fallback
app.get("/pages/:page", (req, res) => {
  const page = req.params.page;
  const filePath = path.join(frontendPath, "pages", page + ".html");
  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).send("Page not found");
    }
  });
});

// ================= DATABASE =================
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log("DB Error ❌", err));

// ================= START SERVER =================
app.listen(PORT, () => {
  console.log(`Fanbase running on http://127.0.0.1:${PORT}`);
});
