// controllers/deviceDataController.js
const DeviceData = require('../models/DeviceDataModel');
const Device = require('../models/deviceModel');
const Alert = require('../models/AlertModel');
/*
exports.createDeviceData = async (req, res) => {
  try {
    const newDeviceData = new DeviceData(req.body);
    await newDeviceData.save();
    res.status(201).json({ message: 'Data saved successfully', data: newDeviceData });
  } catch (error) {
    res.status(400).json({ message: 'Error saving data', error });
  }
};
*/
exports.createDeviceData = async (req, res) => {
  try {
    console.log(req.body);
    const newDeviceData = new DeviceData(req.body);
    await newDeviceData.save();

    // Define normal heart rate range
    const normalHeartRateLowerBound = 40;
    const normalHeartRateUpperBound = 200;

    // Check if heart rate is outside the normal range
    if (newDeviceData.heartrate < normalHeartRateLowerBound || newDeviceData.heartrate > normalHeartRateUpperBound) {
      // Create an alert message record
      const alertMessage = `Heart rate out of normal range: ${newDeviceData.heartrate} BPM`;
      const newAlert = new Alert({
        message: alertMessage,
        deviceId: newDeviceData.deviceId,
        timestamp: new Date() // Assuming your Alert model has a timestamp field
      });

      await newAlert.save();
    }

    res.status(201).json({ message: 'Data saved successfully', data: newDeviceData });
  } catch (error) {
    res.status(400).json({ message: 'Error saving data', error });
  }
};
exports.fetchActiveDeviceData = async (req, res) => {
  try {
    const activeDevices = await Device.find({ status: 'active' });
   
    let dataQueries = activeDevices.map(device => {
      return DeviceData.find({
        deviceId: device.name,
        timestamp: { $gt: device.dateTimeOfActivation }
      }).sort({ timestamp: -1 }); 
    });

    const deviceDataResults = await Promise.all(dataQueries);
    const flattenedResults = [].concat.apply([], deviceDataResults); // Flatten the array of arrays

    // Grouping the flattened results by deviceId
    const groupedByDeviceId = flattenedResults.reduce((acc, record) => {
      // If the array for this deviceId doesn't exist, initialize it
      if (!acc[record.deviceId]) {
        acc[record.deviceId] = [];
      }
      acc[record.deviceId].push(record);
      return acc;
    }, {});

    res.json(groupedByDeviceId);
  } catch (error) {
    res.status(500).send({ message: 'Failed to fetch active device data', error });
  }
};