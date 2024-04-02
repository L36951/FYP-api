// models/DeviceData.js
const mongoose = require('mongoose');

const deviceDataSchema = new mongoose.Schema({
  deviceId: { type: String, required: true },
  position: {
    beacon1: Number,
    beacon2: Number,
    beacon3: Number,
    beacon4: Number
  },
  heartrate: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now } // Automatically capture the timestamp of data reception
});

module.exports = mongoose.model('DeviceData', deviceDataSchema);
