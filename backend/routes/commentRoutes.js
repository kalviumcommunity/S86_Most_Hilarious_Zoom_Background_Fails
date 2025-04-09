const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

// Get all comments
router.get('/', async (req, res) => {
  const comments = await Comment.find();
  res.json(comments);
});

// Add new comment
router.post('/', async (req, res) => {
  const comment = new Comment(req.body);
  await comment.save();
  res.json(comment);
});

// Update a comment
router.put('/:id', async (req, res) => {
  const updated = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Delete a comment
router.delete('/:id', async (req, res) => {
  await Comment.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;
