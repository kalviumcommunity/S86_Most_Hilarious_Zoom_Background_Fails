import express from 'express';
import Comment from './models/comment.js';

const router = express.Router();

// Update a comment
router.put('/comments/:id', async (req, res) => {
  const { id } = req.params;
  const { author, text } = req.body;
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      { author, text },
      { new: true }
    );
    res.json(updatedComment);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update comment' });
  }
});

// Delete a comment
router.delete('/comments/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Comment.findByIdAndDelete(id);
    res.json({ message: 'Comment deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete comment' });
  }
});

export default router;
