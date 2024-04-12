const Alert = require('../models/AlertModel');


exports.getAlertMessages = async (req, res) => {
    try {
      const alerts = await Alert.find({}).sort({ timestamp: -1 }); // Fetch all alerts, you can customize this query as needed
      console.log(alerts)
      res.status(200).json({ message: 'Alerts fetched successfully', alerts });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching alerts', error });
    }
  };
  