const express = require('express');
const router = express.Router();
const StaffController = require('../controllers/staffController');
const { authenticate } = require('../middlewares/authMiddleware'); // Import the authentication middleware


// Register a new staff member
router.post('/register', StaffController.register);

// Staff login
router.post('/login', StaffController.login);

// Route to update staff details, with authentication
router.patch('/update/:staffId', authenticate, StaffController.updateStaffDetails);

// Route to delete a staff account, with authentication
router.delete('/delete/:staffId', authenticate, StaffController.deleteStaffAccount);


module.exports = router;
