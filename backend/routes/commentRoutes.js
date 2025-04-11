const express = require('express');
const { body, validationResult } = require('express-validator');
const Comment = require('../models/comment');
const router = express.Router();

// Create
router.post(
  '/',
  [
    body('author').notEmpty(),
    body('text').notEmpty(),
    body('created_by').notEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const comment = new Comment(req.body);
      await comment.save();
      res.status(201).json(comment);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// Read (with optional filter)
router.get('/', async (req, res) => {
  const { user } = req.query;
  try {
    const filter = user ? { created_by: user } : {};
    const comments = await Comment.find(filter);
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update
router.put('/:id', async (req, res) => {
  try {
    const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete
router.delete('/:id', async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Comment deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
