const mongoose = require('mongoose');

const zoomFailSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  image_url: {
    type: String,
    required: true  // URL of the image representing the Zoom fail
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 1
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Reference to the User model
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'  // Reference to the Comment model for storing comments
  }]
});

const ZoomFail = mongoose.model('ZoomFail', zoomFailSchema);
module.exports = ZoomFail;
