// models/lockerModel.js
const mongoose = require('mongoose');

const lockerSchema = new mongoose.Schema({
  lockerId: { type: String, required: true, unique: true },
  status: { type: String, enum: ['available', 'occupied'], default: 'available' },
  tagUid: { type: String, default: null } // Stores the NFC tag UID
});

module.exports = mongoose.model('Locker', lockerSchema);
