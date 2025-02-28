const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  date_joined: {
    type: Date,
    default: Date.now
  },
  profile_picture: {
    type: String,
    default: 'defaultProfilePic.jpg'  // Store URL or filename for profile picture
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
