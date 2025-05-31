const mongoose = require('mongoose');

const gymSchema = mongoose.Schema({
    gymName: String,
    gstNo: String,
    address: String,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'owner',
    },
    managers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'manager',
    }],
    plans: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'plan',
    }],
    customers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customer',
    }],
    equipments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'equipment',
    }],
    diteplans: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'diteplan',
    }],
    monthIncome: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'monthIncome',
    }]
});


module.exports = mongoose.model("gym", gymSchema);