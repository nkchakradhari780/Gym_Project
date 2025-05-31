const mongoose = require('mongoose');

const monthIncomeSchema = mongoose.Schema({
    monthName: String,
    plansSell: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: plans,
    }],
    totalIncome: Number
});

module.exports = mongoose.model("monthIncome", monthIncomeSchema);