const mongoose = require('mongoose');

const positionSchema = new mongoose.Schema({
  deviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Device', required: true },
  timestamp: { type: Date, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  // Add more fields if necessary, like accuracy, altitude, etc.
});

module.exports = mongoose.model('Position', positionSchema);
