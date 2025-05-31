const mongoose = require('mongoose');

const planSchema = mongoose.Schema({
    planID: String,
    level: String,
    planName: String,
    price: Number,
    duration: Number,       // In Days 
    category: String,
    duratioin: String,      // (fix typo to 'duration' if it's incorrect)
    createDate: {
        type: Date,
        default: Date.now
    },
    facilities: [{
        type: String
    }],
    trainer: [{
        trainerID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Trainer',  // Assuming you have a 'Trainer' model
            required: true
        },
        trainerName: {
            type: String,
            required: true
        },
        trainerLevel: {
            type: String,
            enum: ['beginner', 'medium', 'advanced'],  // You can customize this based on your needs
            required: true
        }
    }]
});

module.exports = mongoose.model("plan", planSchema);
