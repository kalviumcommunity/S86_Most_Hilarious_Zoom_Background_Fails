const mongoose = require('mongoose');

const appSettingsSchema = new mongoose.Schema({
  setting_name: {
    type: String,
    required: true
  },
  setting_value: {
    type: String,
    required: true
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

const AppSettings = mongoose.model('AppSettings', appSettingsSchema);
module.exports = AppSettings;
