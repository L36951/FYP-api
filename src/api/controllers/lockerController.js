// controllers/lockerController.js
const Locker = require('../models/lockerModel');

exports.checkAvailability = async (req, res) => {
  const { lockerId } = req.params;
  try {
    const locker = await Locker.findOne({ lockerId });
    if (!locker) return res.status(404).json({ message: 'Locker not found' });

    res.json({ available: locker.status === 'available' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.requestAccess = async (req, res) => {
  const { lockerId } = req.params;
  const { tagUid } = req.body; // Expecting the NFC tag UID in the request body.

  try {
    const locker = await Locker.findOneAndUpdate({ lockerId, status: 'available' }, { status: 'occupied', tagUid }, { new: true });
    if (!locker) return res.status(400).json({ message: 'Locker not available or not found' });

    res.json({ message: 'Access granted', locker });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


// Create a new locker
exports.createLocker = async (req, res) => {
  try {
    const newLocker = new Locker(req.body);
    const savedLocker = await newLocker.save();
    res.status(201).json(savedLocker);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create locker', error });
  }
};

// Update a locker
exports.updateLocker = async (req, res) => {
  const { lockerId } = req.params;
  try {
    const updatedLocker = await Locker.findOneAndUpdate({ lockerId }, req.body, { new: true });
    if (!updatedLocker) {
      return res.status(404).json({ message: 'Locker not found' });
    }
    res.json(updatedLocker);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update locker', error });
  }
};

// Delete a locker
exports.deleteLocker = async (req, res) => {
  const { lockerId } = req.params;
  try {
    const deletedLocker = await Locker.findOneAndDelete({ lockerId });
    if (!deletedLocker) {
      return res.status(404).json({ message: 'Locker not found' });
    }
    res.json({ message: 'Locker deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete locker', error });
  }
};
