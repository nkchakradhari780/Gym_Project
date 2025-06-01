const bcrypt = require("bcrypt");
const userModel = require("../models/user_model");
const gymModel = require("../models/gym_model");

module.exports.registerOwner = async (req, res) => {
  try {
    let { fullname, email, password, contact, photo, address, aadharNo, age } =
      req.body;

    let owner = await userModel.findOne({ email, role: "admin" });
    console.log("owner:", owner);
    if (owner) return res.status(401).send("Owner Alredy Exists");

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) return res.send(err.message);
        else {
          let owner = await userModel.create({
            fullname,
            email,
            password: hash,
            contact,
            photo,
            address,
            aadharNo,
            age,
            role: "admin",
          });
          console.log(owner);
          res.send("Owner Created");
        }
      });
    });
  } catch (err) {
    console.error(err.message);
    res.send("Something Went Wrong ");
  }
};

module.exports.ownerDetails = async (req, res) => {
  try {
    email = req.email;
    let owner = await userModel.findOne({ email, role: "admin" });
    if (!owner) {
      return res.status(404).send("Owner Not Found");
    }

    res.status(200).json({
      owner,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
};

module.exports.count = async (req, res) => {
  try {
    const adminCount = await userModel.countDocuments({ role: "admin" });
    const managerCount = await userModel.countDocuments({ role: "manager" });
    const trainerCount = await userModel.countDocuments({ role: "trainer" });
    const memberCount = await userModel.countDocuments({ role: "member" });

    res.status(200).json({
      success: true,
      counts: {
        admin: adminCount,
        manager: managerCount,
        trainer: trainerCount,
        member: memberCount,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching user counts",
      error: error.message,
    });
  }
};
