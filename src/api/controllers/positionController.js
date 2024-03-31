const Position = require('../models/positionModel');

// POST - Create a new position record
exports.createPosition = async (req, res) => {
  try {
    const position = new Position(req.body);
    await position.save();
    res.status(201).json(position);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create position record', error });
  }
};

// GET - Retrieve all position records
exports.getAllPositions = async (req, res) => {
  try {
    const positions = await Position.find().populate('deviceId');
    res.status(200).json(positions);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get position records', error });
  }
};

// GET - Retrieve a single position record by ID
exports.getPositionById = async (req, res) => {
  try {
    const position = await Position.findById(req.params.id).populate('deviceId');
    if (!position) {
      return res.status(404).json({ message: 'Position record not found' });
    }
    res.status(200).json(position);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get position record', error });
  }
};

// PUT - Update a position record
exports.updatePosition = async (req, res) => {
  try {
    const position = await Position.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!position) {
      return res.status(404).json({ message: 'Position record not found' });
    }
    res.status(200).json(position);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update position record', error });
  }
};

// DELETE - Delete a position record
exports.deletePosition = async (req, res) => {
  try {
    const position = await Position.findByIdAndDelete(req.params.id);
    if (!position) {
      return res.status(404).json({ message: 'Position record not found' });
    }
    res.status(200).json({ message: 'Position record deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete position record', error });
  }
};
