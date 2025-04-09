const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
  tag_name: {
    type: String,
    required: true,
    unique: true
  },
  associated_zoom_fails: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ZoomFail'
  }],
  created_at: {
    type: Date,
    default: Date.now
  }
});

const Tag = mongoose.model('Tag', tagSchema);
module.exports = Tag;
