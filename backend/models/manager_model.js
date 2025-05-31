const mongoose = require("mongoose");

const managerSchema = mongoose.Schema({
  fullName: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  contact: { 
    type: Number, 
    required: true 
  },
  address: { 
    type: String 
  },
  aadharNo: {  
    type: String ,
    // required: true
  },
  age: { type: Number },
  salary: { type: Number },
  Photo: { type: Buffer },
  managerId: { type: String },
  joiningDate: {
    type: Date,
    default: Date.now, // Corrected default for date
  },
  status: {
    type: String,
    enum: ["active", "inactive", "on_leave"]
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"], // Corrected enum syntax
  },
  role: {
    type: String,
    enum: ['admin', 'trainer', 'manager', 'member'],
    // default: 'manager'
  },
  trainers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "trainer",
    },
  ],
});

module.exports = mongoose.model("manager", managerSchema);
 