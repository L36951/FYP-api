const express = require('express');
const router = express.Router();
const deviceController = require('../controllers/deviceController');
const { authenticate } = require('../middlewares/authMiddleware'); // Assuming you have authentication middleware

router.post('/', authenticate, deviceController.createDevice); // Create a new device
router.get('/', authenticate, deviceController.getAllDevices); // Get all devices
router.get('/:id', authenticate, deviceController.getDeviceById); // Get a single device by ID
router.put('/:id', authenticate, deviceController.updateDevice); // Update a device
router.delete('/:id', authenticate, deviceController.deleteDevice); // Delete a device



module.exports = router;
