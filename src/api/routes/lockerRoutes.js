// routes/lockerRoutes.js
const express = require('express');
const router = express.Router();
const lockerController = require('../controllers/lockerController');
const { authenticate } = require('../middlewares/authMiddleware'); // Use if authentication is needed

router.get('/:lockerId/availability', authenticate, lockerController.checkAvailability);
router.post('/:lockerId/access', authenticate, lockerController.requestAccess);
// Route to create a new locker
router.post('/', authenticate, lockerController.createLocker);

// Route to update a locker by its ID
router.put('/:lockerId', authenticate, lockerController.updateLocker);

// Route to delete a locker by its ID
router.delete('/:lockerId', authenticate, lockerController.deleteLocker);



router.post('/:lockerId/release', authenticate, lockerController.releaseLocker);
// In routes/lockerRoutes.js or equivalent
router.post('/match', lockerController.matchTagWithLocker);
module.exports = router;
