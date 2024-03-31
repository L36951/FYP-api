const express = require('express');
const router = express.Router();
const heartRateController = require('../controllers/heartRateController');
const { authenticate } = require('../middlewares/authMiddleware'); // Assuming you have authentication middleware

router.post('/', authenticate, heartRateController.createHeartRate); // Create a new heart rate record
router.get('/', authenticate, heartRateController.getAllHeartRates); // Get all heart rate records
router.get('/:id', authenticate, heartRateController.getHeartRateById); // Get a single heart rate record by ID
router.put('/:id', authenticate, heartRateController.updateHeartRate); // Update a heart rate record
router.delete('/:id', authenticate, heartRateController.deleteHeartRate); // Delete a heart rate record

module.exports = router;
