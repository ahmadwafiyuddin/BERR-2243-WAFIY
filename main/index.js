// index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const rideRoutes = require('./routes/rides');
require('dotenv').config(); // Load environment variables

const app = express();
app.use(express.json()); // Allows us to read JSON data
app.use('/api/auth', authRoutes);
app.use('/api/rides', rideRoutes);
app.use(cors());

// Connect to MongoDB (Replace with your Atlas string from Week 3/Azure Guide)
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mytaxi')
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// Basic Route
app.get('/', (req, res) => {
    res.send('MyTaxi Backend is Running!');
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});