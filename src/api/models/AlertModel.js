const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({

  message: {
    type: String,
    required: true
  },
  deviceId: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const Alert = mongoose.model('Alert', alertSchema);
module.exports = Alert;
