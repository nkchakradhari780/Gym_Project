const bcrypt = require("bcrypt");
const userModel = require("../models/user_model");


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

    let existingManager = await userModel.findOne({ email });
    if (existingManager) return res.status(401).send("Manager already exists.");

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err)
          return res 
            .status(500)
            .send("Error occurred while hashing the password");
        else {
          let newManager = await userModel.create({
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
            role: 'manager'
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



module.exports.updateManager = async (req, res) => {
  try {
    let { salary, address, contact, email, status } = req.body;

    let manager = await userModel.findOneAndUpdate(
      { email },
      { salary, address, contact},
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
    let manager = await userModel.findByIdAndDelete(id);

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


module.exports.listManagers = async (req, res) => {
  try {
    let managerList = await userModel.find({role: 'manager'});
    
    let totalManagers = await userModel.countDocuments({role: 'manager'});

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

    let manager = await userModel.findOne({email, role: 'manager'})
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
    let manager = await userModel.findById(managerId);
    
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
