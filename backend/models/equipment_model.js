const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,  // Ensures `id` is unique
        trim: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,  // `name` can have duplicates
    },
    type: {
        type: String,
        required: true,
        trim: true,
        enum: ['Cardio', 'Strength', 'Flexibility', 'Balance', 'Other'],
    },
    brand: {
        type: String,
        trim: true,
    },
    purchaseDate: {
        type: Date,
        required: true,
    },
    purchasePrice: {
        type: Number,
        required: true,
        min: 0,  // Ensures the price is non-negative
    },
    maintenanceDate: {
        type: Date,
    },
    condition: {
        type: String,
        required: true,
        enum: ['New', 'Good', 'Fair', 'Poor'],
    },
    location: {
        type: String,
        required: true,
        enum: ['Cardio Section', 'Weightlifting Area', 'Yoga Room', 'Main Floor', 'Basement', 'First Floor', 'Second Floor', 'Pool Area', 'Locker Room', 'Reception'],
    },
    status: {
        type: String,
        enum: ['Available', 'In Use', 'Under Maintenance', 'Out of Order'],
        default: 'Available',
    },
    description: {
        type: String,
        trim: true,
    },
    quantity: { // New field for number of equipment
        type: Number,
        required: true,
        min: 0,  // Ensures quantity is non-negative
        default: 1,  // Default to 1 if not specified
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Equipment', equipmentSchema);
