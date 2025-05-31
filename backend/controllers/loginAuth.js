// src/api/auth/login.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const customerModel = require("../models/costumer_model");
const managerModel = require("../models/manager_model");
const ownerModel = require('../models/owner_model');
const trainerModel = require("../models/trainer_model");
const userModel = require("../models/user_model");

module.exports.loginHandler = async (req, res) => {
  if (req.method === 'POST') {
    const { email, password, role } = req.body;

    // let user;

    // // Find user based on role
    // switch (role) {
    //   case 'member':
    //     user = await customerModel.findOne({ email });
    //     break;
    //   case 'manager':
    //     user = await managerModel.findOne({ email });
    //     break;
    //   case 'trainer':
    //     user = await trainerModel.findOne({ email });
    //     break;
    //   case 'admin':
    //     user = await ownerModel.findOne({ email });
    //     break;
    //   default:
    //     return res.status(400).json({ success: false, message: 'Invalid role' });
    // }

    let user = await userModel.findOne({ email });
    console.log("user: ",user)

    // Check if user exists
    if (!user) {
      return res.status(404).json({ success: false, message: 'Email or password is incorrect' });
    }

    // Compare the password
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return res.status(500).send("Error occurred while comparing passwords");
      }

      if (result) {
        // Generate JWT token if password matches
        const token = jwt.sign(
          { Id: user._id, role: role, email: email },
          process.env.JWT_KEY
        );

        // Set token as an HTTP-only cookie
        res.cookie("token", token, {
          httpOnly: true,
          secure: false, // For testing, change to true in production with HTTPS
          maxAge: 3600000, // 1 hour
        });

        // Send success response
        return res.status(200).json({ success: true, message: "Logged in successfully", user, token });
      } else {
        // Send error response if passwords don't match
        return res.status(401).json({ success: false, message: "Email or password is incorrect" });
      }
    });
  } else {
    // Method not allowed if it's not a POST request
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
};
