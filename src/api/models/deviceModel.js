const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  serialNumber: { type: String, required: true, unique: true },
  location: { type: String, required: false },
  status: { type: String, enum: ['active', 'inactive'], default: 'inactive' },
  dateTimeOfActivation: { type: Date },
  tagUid: { type: String, default: null } // Stores the NFC tag UID
  // Add more fields as necessary
});

module.exports = mongoose.model('Device', deviceSchema);
