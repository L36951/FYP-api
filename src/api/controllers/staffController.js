const Staff = require('../models/staffModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
      const { name, email, password, role } = req.body;
    console.log(name,email,password,role);
    // Check if the email is already in use
    const existingStaff = await Staff.findOne({ email });
    if (existingStaff) {
      return res.status(409).json({ message: 'Email already in use' });
    }

      const hashedPassword = await bcrypt.hash(password, 10);

      const staff = new Staff({ name, email, password: hashedPassword, role });

      await staff.save();
      res.status(201).json({ message: 'Staff registered successfully' });
    } catch (error) {
        console.error(error); // Log the error to the server console
        res.status(500).json({ message: 'Error registering staff', error: error.message });
    }
  };
  
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const staff = await Staff.findOne({ email });
    if (!staff) return res.status(401).json({ message: 'Authentication failed' });

    const match = await bcrypt.compare(password, staff.password);
    if (match) {
      const token = jwt.sign(
        { email: staff.email, staffId: staff._id },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      return res.status(200).json({ message: 'Authentication successful', token });
    } else {
      return res.status(401).json({ message: 'Authentication failed' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error during authentication', error });
  }
};

exports.updateStaffDetails = async (req, res) => {
    const staffId = req.params.staffId;
    const updateOps = {};
    if (req.body.password) {
        try {
          // Hash the new password
          const hashedPassword = await bcrypt.hash(req.body.password, 10);
          // Update the password in the request body to use the hashed version
          req.body.password = hashedPassword;
        } catch (error) {
          return res.status(500).json({ message: 'Error hashing password', error });
        }
      }
    // Construct an object for the update operation
    for (const [key, value] of Object.entries(req.body)) {
      updateOps[key] = value;
    }
  
    try {
      const result = await Staff.updateOne({ _id: staffId }, { $set: updateOps });
      res.status(200).json({
        message: 'Staff details updated',
        result: result
      });
    } catch (error) {
      res.status(500).json({ message: 'Error updating staff details', error });
    }
  };
  exports.deleteStaffAccount = async (req, res) => {
    const staffId = req.params.staffId;
  
    try {
      const result = await Staff.deleteOne({ _id: staffId });
      res.status(200).json({
        message: 'Staff account deleted',
        result: result
      });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting staff account', error });
    }
  };
  
