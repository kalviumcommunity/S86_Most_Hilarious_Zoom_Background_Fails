require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

console.log("🚀 Starting Server..."); // Log before anything runs

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

console.log("📌 MongoDB URI:", MONGO_URI ? "Loaded from .env" : "Not Found");

let dbStatus = "⏳ Connecting...";

// Connect to MongoDB Atlas
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('✅ Connected to MongoDB Atlas');
        dbStatus = "✅ Database connected";
    })
    .catch(err => {
        console.error('❌ MongoDB Connection Error:', err);
        dbStatus = "❌ Database connection failed";
    });

// Middleware
app.use(express.json());
app.use(cors());

// Import Routes
const routes = require('./routes');
app.use('/api', routes);

// ✅ Home Route (Displays DB Connection Status)
app.get('/', (req, res) => {
    const connectionStatus = mongoose.connection.readyState === 1 ? "✅ Database connected" : "❌ Database connection failed";
    res.json({ message: "Welcome to ASAP", dbStatus: connectionStatus });
});

// Start Server
app.listen(PORT, () => console.log(`🚀 Server is running on http://localhost:${PORT}`));
