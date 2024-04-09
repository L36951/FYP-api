// controllers/lockerController.js
const Locker = require('../models/lockerModel');
const Device = require('../models/deviceModel'); 
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
    

    const device = await Device.findOneAndUpdate(
      { 'status': 'inactive', 'tagUid': tagUid }, 
      { 'status': 'active', 'dateTimeOfActivation': new Date() },
      { new: true }
    );

    if (!device) return res.status(400).json({ message: 'Device not found or already active' });


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
// controllers/lockerController.js
// Add this function to your existing locker controller

exports.releaseLocker = async (req, res) => {
  const { lockerId } = req.params;

  try {
     // 首先查询储物柜获取当前的 tagUid
     const locker = await Locker.findOne({ lockerId });

     if (!locker) {
       return res.status(404).json({ message: 'Locker not found' });
     }
 
     // 使用获取到的 tagUid 查找并更新设备状态为 'inactive'
     const device = await Device.findOneAndUpdate(
       { tagUid: locker.tagUid }, // 使用查询到的 tagUid
       { status: 'inactive' },
       { new: true }
     );
 
     // 然后更新储物柜状态为 'available' 并重置 tagUid
     const updatedLocker = await Locker.findOneAndUpdate(
       { lockerId },
       { status: 'available', tagUid: null },
       { new: true }
     );
 
     res.json({ message: 'Locker released successfully', locker: updatedLocker, device });
  } catch (error) {
    res.status(500).json({ message: 'Failed to release locker', error });
  }
};


// In controllers/lockerController.js
exports.matchTagWithLocker = async (req, res) => {
  const { lockerId, tagUid } = req.body; // Extract lockerId and tagUid from request body

  try {
    const locker = await Locker.findOne({ lockerId: lockerId }); // Look up the locker by ID
    if (!locker) {
      return res.status(404).json({ message: 'Locker not found' });
    }

    // Check if the provided tagUid matches the one stored with the locker
    const isMatch = locker.tagUid === tagUid;
    if (isMatch) {
      res.json({ message: 'Tag matches the locker', match: true });
    } else {
      res.json({ message: 'Tag does not match the locker', match: false });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
