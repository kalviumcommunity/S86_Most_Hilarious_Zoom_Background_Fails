const express = require('express');
const router = express.Router();
const User = require('./models/user'); // Make sure the model path is correct

// ✅ Create a new user (POST)
router.post('/users', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json({ message: "✅ User created successfully", user: newUser });
    } catch (error) {
        res.status(500).json({ error: "❌ Failed to create user", details: error.message });
    }
});

module.exports = router;
