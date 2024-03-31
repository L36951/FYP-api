const mongoose = require('mongoose');

const heartRateSchema = new mongoose.Schema({
  deviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Device', required: true },
  timestamp: { type: Date, required: true },
  rate: { type: Number, required: true }, // Heart rate value
  // Add more fields if necessary
});

module.exports = mongoose.model('HeartRate', heartRateSchema);
