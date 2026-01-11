const express = require('express');
const router = express.Router();
const Ride = require('../models/Ride');
const checkAuth = require('../middleware/auth'); // Import the security guard

// 1. REQUEST A RIDE (Customer Only)
// We add 'checkAuth' here to protect this route
router.post('/', checkAuth, async (req, res) => {
    try {
        const ride = new Ride({
            passengerId: req.userData.userId, // We get this ID automatically from the token!
            pickupLocation: req.body.pickupLocation,
            destination: req.body.destination,
            fare: req.body.fare,
            status: 'requested'
        });
        const savedRide = await ride.save();
        res.status(201).json({ message: "Ride booked!", ride: savedRide });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. VIEW AVAILABLE RIDES (For Drivers)
router.get('/available', checkAuth, async (req, res) => {
    try {
        // Only show rides that are 'requested' and have no driver yet
        const rides = await Ride.find({ status: 'requested' });
        res.json(rides);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. ACCEPT A RIDE (Driver Only)
router.patch('/:id/accept', checkAuth, async (req, res) => {
    try {
        // Find the ride
        const ride = await Ride.findById(req.params.id);
        if (!ride) return res.status(404).json({ message: "Ride not found" });

        // Update it with the Driver's ID (from the token)
        ride.driverId = req.userData.userId;
        ride.status = 'accepted';
        
        await ride.save();
        res.json({ message: "Ride accepted!", ride: ride });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;