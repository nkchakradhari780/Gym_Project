const mongoose = require('mongoose');

const ditePlanSchema = mongoose.Schema({
    planName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    calories: {
        type: Number,
        required: true,
    },
    protein: {
        type: Number, // grams of protein
        required: true,
    },
    carbs: {
        type: Number, // grams of carbohydrates
        required: true,
    },
    fats: {
        type: Number, // grams of fats
        required: true,
    },
    duration: {
        type: Number, // in days
        required: true,
    },
    meals: [{
        mealName: {
            type: String,
            required: true,
        },
        items: [{
            itemName: {
                type: String,
                required: true,
            },
            quantity: {
                type: String, // e.g., 100g, 1 serving
                required: true,
            },
            calories: {
                type: Number, // calories per item
                required: true,
            }
        }]
    }],
    trainer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'trainer',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("ditePlan", ditePlanSchema);
