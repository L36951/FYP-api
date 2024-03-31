const mongoose = require('mongoose');

const express = require('express');
const { MongoClient } = require('mongodb');
const staffRoutes = require('./src/api/routes/staffRoutes');
const deviceRoutes = require('./src/api/routes/deviceRoutes');
const heartRateRoutes = require('./src/api/routes/heartRateRoutes');
const positionRoutes = require('./src/api/routes/positionRoutes');
const lockerRoutes = require('./src/api/routes/lockerRoutes');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;

// MongoDB URI and Database Name
const uri =process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME;

app.use(express.json()); // Middleware to parse JSON bodies

// Connect to MongoDB
const client = new MongoClient(uri);
client.connect().then(() => {
  const db = client.db(dbName);
  console.log('Connected to MongoDB');

  // Define routes here
  // Example: app.get('/api/devices', async (req, res) => { ... });

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}).catch(err => console.error(err));

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB connection error:', err));
  
// Use routes
app.use('/api/staff', staffRoutes);
app.use('/api/devices', deviceRoutes); // Mount the device routes
app.use('/api/heartRates', heartRateRoutes); // Mount the heart rate routes
app.use('/api/positions', positionRoutes); // Mount the position routes
app.use('/api/lockers', lockerRoutes);
