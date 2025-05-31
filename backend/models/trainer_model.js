const mongoose = require('mongoose');

const trainerSchema = mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
    contact: Number,
    photo: String,
    address: String,
    salary: Number,
    age: Number,
    speciality: String,
    gender: {
        type: String, 
        enum: ["male", "female", "other"], // Corrected enum syntax
    },
    role: {
        type: String,
        enum: ['admin', 'trainer', 'manager', 'member'],
        default: 'trainer'
    },
    trainningPlans: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'plan'
    }],
    costumer: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'costumer'
    }],
    // Attendance - storing attendance records as an array of dates
    attendance: [
        {
            date: {
                type: Date,
                required: true,
            },
            status: {
                type: String,
                enum: ['Present', 'Absent'], // Trainer can be marked as 'Present' or 'Absent'
                required: true,
            },
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    joiningDate: { // New field for joining date
        type: Date,
        default: Date.now, // Sets the current date as default
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'on_leave', 'retired'], // Possible statuses for the trainer
        default: 'active', // Default to 'active'
      },
});

module.exports = mongoose.model("trainer", trainerSchema);
