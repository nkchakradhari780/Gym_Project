const mongoose = require('mongoose');

const ownerSchema = mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
    contact: Number,
    photo: String,
    address: String,
    aadharNo: String,
    age: Number,
    role: {
        type: String,
        enum: ['admin', 'trainer', 'manager', 'member'],
        default: 'admin'
    },
    gym: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'gym'
    }],
    
});

module.exports = mongoose.model("owner",ownerSchema);