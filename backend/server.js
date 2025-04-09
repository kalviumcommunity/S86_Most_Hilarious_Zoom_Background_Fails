require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Comment = require('./models/comment');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

let dbStatus = "⏳ Connecting...";

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB Atlas");
    dbStatus = "✅ Database connected";
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    dbStatus = "❌ Database connection failed";
  });

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Status Route
app.get("/", (req, res) => res.json({ message: dbStatus }));

// Comments Route
app.get("/comments", async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: "❌ Failed to fetch comments", details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
