const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  permissions: [{
    type: String,
    enum: ['create', 'edit', 'delete', 'view'],
    required: true
  }],
  created_at: {
    type: Date,
    default: Date.now
  }
});

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
