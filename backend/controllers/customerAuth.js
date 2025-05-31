const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const customerModel = require("../models/costumer_model");
const trainerModel = require("../models/trainer_model");
const { generateToken } = require("../utils/generatetoken");
const mongoose = require("mongoose");

module.exports.registerCustomer = async (req, res) => {
  try {
    const {
      email,
      fullName,
      password,
      contact,
      address,
      weight,
      age,
      gender,
      joinedPlans = [],
      trainer = null,
      ditePlans = [],
      attendance = [],
    } = req.body;

    // Check if the customer already exists
    let customer = await customerModel.findOne({ email });
    if (customer) {
      return res.status(401).send("Customer already exists. Please login.");
    }

    // Hash the password
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err)
          return res
            .status(500)
            .send("Error occured while hashing the password");
        else {
          let newCustomer = await customerModel.create({
            email,
            fullName,
            contact,
            address,
            weight,
            age,
            password: hash,
            gender,
            joinedPlans,
            trainer,
            ditePlans,
            createdAt: new Date(), // or let MongoDB handle the default
          });

          if (trainer) {
            if (!mongoose.Types.ObjectId.isValid(trainer)) {
              return res.status(400).send("Invalid trainer ID format");
            }

            const existingTrainer = await trainerModel.findById(trainer);
            if (!existingTrainer) {
              console.log("Trainer not found in the database");
              return res.status(404).send("Trainer not found");
            }

            const updatedTrainer = await trainerModel.findByIdAndUpdate(
              trainer,
              { $push: { costumer: newCustomer._id } }, // Add the new customer's ID to the customerId array
              { new: true } // Return the updated document
            );

            console.log(updatedTrainer);

            if (!updatedTrainer) {
              return res.status(404).send("Trainer Not found");
            }
          }
          res.status(201).send("Customer created successfully");
        }
      });
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
};

module.exports.loginCustomer = async (req, res) => {
  try {
    let { email, password } = req.body;

    let customer = await customerModel.findOne({ email });
    if (!customer) return res.send("Email or password is incorrect");
    bcrypt.compare(password, customer.password, (err, result) => {
      if (err)
        return res.status(500).send("Error occurred while comparing passwords");

      if (result) {
        let token = jwt.sign({ customerId: customer._id }, process.env.JWT_KEY);
        res.cookie("token", token, {
          httpOnly: true,
          secrure: false,
          maxAge: 3600000,
        });
        res.status(200).json({
          success: true,
          message: "Customer LoggedIN Successfully",
          customer,
          token,
        });
      } else {
        req.send("Email or password is incorrect");
        return res.redirect("/");
      }
    });
  } catch (err) {
    console.log(err.message);
  }
};

module.exports.updateCustomer = async (req, res) => {
  try {
    let { email, fullName, contact, address, weight, age, password, gender } =
      req.body;

    let customer = await customerModel.findOneAndUpdate(
      { email },
      { fullName, contact, address, weight, age, password, gender },
      { new: true }
    );
    if (!customer) return res.status(401).send("Something Went wrong");
    res.send(customer);
  } catch (err) {
    console.log(err);
  }
};

// Check customer attendance
module.exports.checkCustomerAttendence = async (req, res) => {
  const { id, role } = req.params;

  try {
    // Find customer by email
    const customer = await customerModel.findById(id);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Return the attendance records if present
    res.status(200).json(customer.attendance || []);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Mark customer attendance
module.exports.customerAttendence = async (req, res) => {
  const { email, date, status } = req.body; // Expecting { date: 'YYYY-MM-DD', status: 'Present' or 'Absent' }

  try {
    // Find customer by email
    const customer = await customerModel.findOne({ email });

    if (!customer) {
      console.log(`customer with email: ${email} not found`);
      return res
        .status(404)
        .json({ message: `customer with email: ${email} not found` });
    }

    // Ensure attendance field exists
    if (!customer.attendance) {
      customer.attendance = [];
    }

    // Check if attendance for the given date already exists
    const existingAttendance = customer.attendance.find(
      (att) => att.date.toDateString() === new Date(date).toDateString()
    );
    if (existingAttendance) {
      existingAttendance.status = status;
    } else {
      // Add new attendance record
      customer.attendance.push({ date: new Date(date), status });
    }

    // Save the updated customer document
    await customer.save();
    res
      .status(200)
      .json({ message: "Attendance marked successfully", customer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.deleteCustomer = async (req, res) => {
  try {
    let { id } = req.params;

    let customer = await customerModel.findByIdAndDelete(id);

    if (!customer) {
      return res.status(404).send("User Not found");
    }

    if (customer.trainer) {
      const updatedTrainer = await trainerModel.findByIdAndUpdate(
        customer.trainer,
        { $pull: { customers: id } }, // Remove the customer ID from the array
        { new: true }
      );

      if (!updatedTrainer) {
        console.log("Trainer not found while updating");
        // Optionally, you could send a warning, but it's not critical for deletion
      } else {
        console.log(
          "Customer removed from trainer's customer list:",
          updatedTrainer
        );
      }
    }

    res.status(200).send("User Deleted Successfully");
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports.customerDetails = async (req, res) => {
  try {
    const { id } = req.params; // Destructure `id` from `req.params`

    // Find the customer by their unique ID
    const customer = await customerModel.findById(id);

    // Check if the customer was not found
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Respond with the customer details
    res.json({ customer });
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.customerDetailsByEmail = async (req, res) => {
  try {
    const email = req.email;

    const customer = await customerModel.findOne({ email });

    if (!customer) {
      return res.status(404).json({ message: " Customer Not Found" });
    }

    res.json({ customer });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.listCustomers = async (req, res) => {
  try {
    // Fetch list of all customers
    let customerList = await customerModel.find().populate({
      path: "joinedPlans",
      model: "plan",
    });

    // Get the total count of customers
    let totalCustomers = await customerModel.countDocuments();

    // Send response with the customer list and total count
    res.status(200).json({
      total: totalCustomers,
      customers: customerList,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.listCustomersAttendence = async (req, res) => {
  try {
    // Fetch list of all customers including attendance data
    let customerList = await customerModel.find();
    // Map through the customers to return only their attendance data
    const customerAttendanceArray = customerList.map((customer) => ({
      customerId: customer._id,
      name: customer.fullName,
      attendance: customer.attendance || [], // Include attendance (default to empty array if not present)
      email: customer.email,
      role: customer.role,
    }));

    // Get the total count of customers
    let totalCustomers = await customerModel.countDocuments();

    // Send response with the attendance array of each customer
    res.status(200).json({
      total: totalCustomers,
      attendanceData: customerAttendanceArray, // This is where you send only the attendance data
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
