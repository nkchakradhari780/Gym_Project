// models/transaction.model.js

const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  costumer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'costumer', // Assuming 'User' is the model for your users (members/admins)
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  type: {
    type: String,
    enum: ['membership', 'purchase', 'refund'], // Define your types here
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'canceled'], // Define your statuses here
    default: 'pending',
  },
  description: {
    type: String,
    trim: true,
  },
  transactionDate: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

module.exports =  mongoose.model('Transaction', transactionSchema);