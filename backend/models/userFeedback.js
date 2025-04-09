const mongoose = require('mongoose');

const userFeedbackSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  feedback_text: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const UserFeedback = mongoose.model('UserFeedback', userFeedbackSchema);
module.exports = UserFeedback;
