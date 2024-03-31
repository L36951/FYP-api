const HeartRate = require('../models/heartRateModel');

// POST - Create a new heart rate record
exports.createHeartRate = async (req, res) => {
  try {
    const heartRate = new HeartRate(req.body);
    await heartRate.save();
    res.status(201).json(heartRate);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create heart rate record', error });
  }
};

// GET - Retrieve all heart rate records
exports.getAllHeartRates = async (req, res) => {
  try {
    const heartRates = await HeartRate.find().populate('deviceId');
    res.status(200).json(heartRates);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get heart rate records', error });
  }
};

// GET - Retrieve a single heart rate record by ID
exports.getHeartRateById = async (req, res) => {
  try {
    const heartRate = await HeartRate.findById(req.params.id).populate('deviceId');
    if (!heartRate) {
      return res.status(404).json({ message: 'Heart rate record not found' });
    }
    res.status(200).json(heartRate);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get heart rate record', error });
  }
};

// PUT - Update a heart rate record
exports.updateHeartRate = async (req, res) => {
  try {
    const heartRate = await HeartRate.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!heartRate) {
      return res.status(404).json({ message: 'Heart rate record not found' });
    }
    res.status(200).json(heartRate);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update heart rate record', error });
  }
};

// DELETE - Delete a heart rate record
exports.deleteHeartRate = async (req, res) => {
  try {
    const heartRate = await HeartRate.findByIdAndDelete(req.params.id);
    if (!heartRate) {
      return res.status(404).json({ message: 'Heart rate record not found' });
    }
    res.status(200).json({ message: 'Heart rate record deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete heart rate record', error });
  }
};
