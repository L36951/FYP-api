// routes/deviceDataRoutes.js or add to an existing routes file
const express = require('express');
const router = express.Router();
const deviceDataController = require('../controllers/deviceDataController');
const { authenticate } = require('../middlewares/authMiddleware'); // Assuming you have authentication middleware
// Route for creating device data entry
router.post('/data',authenticate, deviceDataController.createDeviceData);
router.get('/active',authenticate, deviceDataController.fetchActiveDeviceData);

module.exports = router;
