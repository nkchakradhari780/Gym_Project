const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullName: String,
    email: {
        type: String, 
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    contact: Number,
    // photo: Buffer,
    address: String,
    weight: Number,
    age: Number,
    startDate: Date,
    salary: Number ,
    aadharNo: String,
    endDate: Date,
    gender: {
        type: String,
        enum: ["male", "female", "other"], // Corrected enum syntax
      },
    role: {
        type: String,
        enum: ['admin', 'trainer', 'manager', 'member'],
    },
    joinedPlans:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'plan'
    }],
    trainer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'trainer'
    },
    ditePlans: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'diteplans'
    }],
    attendance: [
        {
            date: {
                type: Date,
                required: true,
            },
            status: {
                type: String,
                enum: ['Present', 'Absent'], 
                required: true,
            },
        }
    ],

    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("user",userSchema);