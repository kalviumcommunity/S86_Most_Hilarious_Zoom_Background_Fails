// routes/commentRoutes.js
const express = require('express');
const { Comment, User } = require('../models'); // Check if these models exist
const router = express.Router();

// Get all comments
router.get('/comments', async (req, res) => {
  try {
    const comments = await Comment.findAll({
      include: User, // Assuming the User model is linked with Comment
    });
    res.json(comments); // Send back the comments in response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch comments" }); // Make sure error messages are clear
  }
});

// Get comments by user
router.get('/comments/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const comments = await Comment.findAll({
      where: { createdBy: userId },
      include: User,
    });
    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
});

module.exports = router;
