const express = require('express');
const { body, validationResult } = require('express-validator');
const Comment = require('../models/comment');

const router = express.Router();

// CREATE with validation
router.post(
  '/comments',
  [
    body('author').notEmpty().withMessage('Author is required'),
    body('text').notEmpty().withMessage('Comment text is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newComment = new Comment(req.body);
      await newComment.save();
      res.status(201).json(newComment);
    } catch (err) {
      res.status(500).json({ message: 'Server Error', error: err.message });
    }
  }
);

// GET all comments
router.get('/comments', async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching comments', error: err.message });
  }
});

// UPDATE comment
router.put('/comments/:id', async (req, res) => {
  try {
    const updated = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating comment', error: err.message });
  }
});

// DELETE comment
router.delete('/comments/:id', async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Comment deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting comment', error: err.message });
  }
});

module.exports = router;
