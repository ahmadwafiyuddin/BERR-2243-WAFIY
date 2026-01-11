const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // We will create this model in a moment

// 1. REGISTER USER (Sign Up)
router.post('/register', async (req, res) => {
    try {
        // Hash the password so it's secure
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Create a new user with the data sent from Postman
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            role: req.body.role || 'customer' // Default to customer if not specified
        });

        const savedUser = await user.save();
        res.status(201).json({ message: "User created successfully", userId: savedUser._id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. LOGIN USER
router.post('/login', async (req, res) => {
    try {
        // Find user by email
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(404).json({ message: "User not found" });

        // Check if password matches
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).json({ message: "Invalid password" });

        // Create the "Token" (The digital key)
        const token = jwt.sign(
            { userId: user._id, role: user.role }, 
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token: token, role: user.role });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;