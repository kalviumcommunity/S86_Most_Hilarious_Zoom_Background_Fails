const mongoose = require('mongoose');

const loginSessionSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  session_token: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  expires_at: {
    type: Date,
    required: true
  }
});

const LoginSession = mongoose.model('LoginSession', loginSessionSchema);
module.exports = LoginSession;
