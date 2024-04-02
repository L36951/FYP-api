// controllers/deviceDataController.js
const DeviceData = require('../models/DeviceDataModel');

exports.createDeviceData = async (req, res) => {
  try {
    const newDeviceData = new DeviceData(req.body);
    await newDeviceData.save();
    res.status(201).json({ message: 'Data saved successfully', data: newDeviceData });
  } catch (error) {
    res.status(400).json({ message: 'Error saving data', error });
  }
};
