const express = require('express');
const router = express.Router();
const alertController = require('../controllers/alertController');
const { authenticate } = require('../middlewares/authMiddleware'); 
// New route for fetching alert messages
router.get('/alerts', authenticate, alertController.getAlertMessages);

module.exports = router;