require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

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

// Import Models
const Admin = require('./models/admin');
const AppSettings = require('./models/appSettings');
const Category = require('./models/category');
const Comment = require('./models/comment');
const LoginSession = require('./models/loginSession');
const Rating = require('./models/rating');
const Tag = require('./models/tag');
const User = require('./models/user');
const UserFeedback = require('./models/userFeedback');
const ZoomFail = require('./models/zoomFail');

// ✅ Home Route (Displays DB Connection Status)
app.get('/', (req, res) => {
    const connectionStatus = mongoose.connection.readyState === 1 ? "✅ Database connected" : "❌ Database connection failed";
    res.json({ message: "Welcome to ASAP", dbStatus: connectionStatus });
});

// Example Routes for Fetching Data
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: '❌ Failed to fetch users', details: error.message });
    }
});

app.get('/zoomFails', async (req, res) => {
    try {
        const zoomFails = await ZoomFail.find();
        res.json(zoomFails);
    } catch (error) {
        res.status(500).json({ error: '❌ Failed to fetch Zoom Fails', details: error.message });
    }
});

// Start Server
app.listen(PORT, () => console.log(`🚀 Server is running on http://localhost:${PORT}`));
