const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const salarySchema = new Schema({
    managerId: { type: Schema.Types.ObjectId, ref: 'Manager', required: false }, // Either Manager or Trainer will be filled
    trainerId: { type: Schema.Types.ObjectId, ref: 'Trainer', required: false }, 
    salary: { type: Number, required: true },
    month: { type: String, required: true },  // Example: "October 2024"
    paid: { type: Boolean, default: false },  // Tracks if salary is paid
    createdAt: { type: Date, default: Date.now }
});

const Salary = mongoose.model('Salary', salarySchema);

module.exports = Salary;
