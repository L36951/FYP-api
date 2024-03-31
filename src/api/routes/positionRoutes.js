const express = require('express');
const router = express.Router();
const positionController = require('../controllers/positionController');
const { authenticate } = require('../middlewares/authMiddleware'); // Assuming you have authentication middleware

router.post('/', authenticate, positionController.createPosition); // Create a new position record
router.get('/', authenticate, positionController.getAllPositions); // Get all position records
router.get('/:id', authenticate, positionController.getPositionById); // Get a single position record by ID
router.put('/:id', authenticate, positionController.updatePosition); // Update a position record
router.delete('/:id', authenticate, positionController.deletePosition); // Delete a position record

module.exports = router;
