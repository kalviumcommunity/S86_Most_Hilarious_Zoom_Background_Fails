const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  zoom_fail_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ZoomFail',
    required: true
  },
  rating_value: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  comment: {
    type: String,
    default: ''
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const Rating = mongoose.model('Rating', ratingSchema);
module.exports = Rating;
