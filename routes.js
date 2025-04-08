const express = require('express');
const router = express.Router();

const User = require('./models/user');
const Task = require('./models/task'); // ✅ New Task model

// ✅ Create a new user
router.post('/users', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json({ message: "✅ User created successfully", user: newUser });
    } catch (error) {
        res.status(500).json({ error: "❌ Failed to create user", details: error.message });
    }
});

// ✅ Dummy Task route
router.get('/dummy-task', (req, res) => {
    const dummyTask = new Task({
        title: "ASAP Component Demo",
        description: "This task is just dummy data for assignment.",
        completed: false,
    });

    res.status(200).json(dummyTask);
});

module.exports = router;
