const express = require('express');
const router = express.Router();
const Comment = require('./models/comment'); // adjust if your model is named differently

// ✅ Test route to check API status
router.get('/', (req, res) => {
  res.json({ message: '🚀 API is working!' });
});

// ✅ GET all comments (you can add others similarly)
router.get('/comments', async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: '❌ Failed to fetch comments', details: error.message });
  }
});

// ✅ POST a new comment
router.post('/comments', async (req, res) => {
  try {
    const newComment = new Comment(req.body);
    await newComment.save();
    res.status(201).json({ message: '✅ Comment added!', comment: newComment });
  } catch (error) {
    res.status(500).json({ error: '❌ Failed to add comment', details: error.message });
  }
});

module.exports = router;
