// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Will be hashed (Week 6)
    role: { 
        type: String, 
        enum: ['customer', 'driver', 'admin'], 
        default: 'customer' 
    },
    // Driver specific fields
    carModel: { type: String }, 
    carPlate: { type: String },
    isAvailable: { type: Boolean, default: false },
    earnings: { type: Number, default: 0 } // For "View Earnings" use case
});

module.exports = mongoose.model('User', userSchema);