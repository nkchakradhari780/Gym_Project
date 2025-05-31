const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const managerModel = require("../models/manager_model");
const { generateToken } = require("../utils/generatetoken");

module.exports.loginManager = async (req, res) => {
  try {
    let { email, password } = req.body;

    let manager = await managerModel.findOne({ email });
    // Changed 'trainer' to 'manager' for the correct variable
    if (!manager) return res.status(401).send("Email or password is incorrect");

    bcrypt.compare(password, manager.password, (err, result) => {
      if (err)
        return res.status(500).send("Error occurred while comparing passwords");
      if (result) {
        let token = jwt.sign({managerId: manager._id},process.env.JWT_KEY); // Changed 'trainer' to 'manager'
        res.cookie("token", token,{
            httpOnly: true,
            secrure: false,
            maxAge: 3600000
        });
        res.status(200).json({success: true, message: "Manager LoggedIN Successfully",manager,token})
      } else {
        return res.status(401).send("Email or password is incorrect");
      }
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
};

module.exports.updateManager = async (req, res) => {
  try {
    let { salary, address, contact, email, status } = req.body;

    let manager = await managerModel.findOneAndUpdate(
      { email },
      { salary, address, contact, status },
      { new: true }
    );
    if (!manager) return res.status(401).send("Something went wrong");
    res.send(manager);
  } 
    catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
};

module.exports.deleteManager = async (req, res) => {
  try {
    const { id } = req.params; // Get manager ID from the URL params

    // Find and delete the manager by ID
    let manager = await managerModel.findByIdAndDelete(id);

    // If no manager is found, return a 404 response
    if (!manager) {
      return res.status(404).send("Manager not found");
    }

    // Successfully deleted the manager
    res.status(200).send("Manager deleted successfully");
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
};


module.exports.registerManager = async (req, res) => {
  try {
    let {
      fullName,
      email,
      password,
      contact,
      address,
      aadharNo,
      age,
      salary,
      managerId,
      status,
    } = req.body;

    console.log(status);

    let existingManager = await managerModel.findOne({ email });
    if (existingManager) return res.status(401).send("Manager already exists.");

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err)
          return res 
            .status(500)
            .send("Error occurred while hashing the password");
        else {
          let newManager = await managerModel.create({
            fullName,
            email,
            contact,
            address,
            aadharNo,
            age,
            salary,
            managerId,
            status,
            password: hash,
          });
          console.log(newManager);
          res.send("Manager registered successfully");
        }
      });
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
};

module.exports.listManagers = async (req, res) => {
  try {
    let managerList = await managerModel.find();
    
    let totalManagers = await managerModel.countDocuments();

    res.status(200).json({
      total: totalManagers,
      managers: managerList
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.managerDetails = async (req,res) => {
  try {
    const email = req.email;

    let manager = await managerModel.findOne({email})
    if(!manager){
      return res
        .status(404)
        .send("Manager Not Found")
    }

    res.status(200).json({
      manager
    })

  }catch (err){
    console.log(err);
    res.status(500).json({message: "Server error"})
  }
}

module.exports.getManagerDetails = async (req, res) => {
  try {
    // Extract managerId from request params
    let managerId = req.params.id;

    // Find the manager by id
    let manager = await managerModel.findById(managerId);
    
    // If manager is not found, return a 404 response
    if (!manager) {
      return res.status(404).send("Manager Not Found");
    }
    // Return manager details in response
    res.status(200).json({
      manager
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};
