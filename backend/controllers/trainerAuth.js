const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const trainerModel = require("../models/trainer_model");
const customerModel = require("../models/costumer_model");
const { generateToken } = require("../utils/generatetoken");

module.exports.loginTrainer = async (req, res) => {
  try {
    let { email, password } = req.body;

    let trainer = await trainerModel.findOne({ email });
    if (!trainer) return res.send("Email or password is incorrect");

    bcrypt.compare(password, trainer.password, (err, result) => {
      if (err)
        return res.status(500).send("Error occurred while comparing passwords");
      if (result) {
        let token = jwt.sign({trainerId: trainer._id},process.env.JWT_KEY);
        res.cookie("token", token,{
            httpOnly: true,
            secrure: false,
            maxAge: 3600000
        });
        res.status(200).json({success: true, message: "Trainer LoggedIN Successfully",trainer,token})
      } else {
        return res.status(401).send("Email or password is incorrect");
      }
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error")
  }
};

module.exports.registerTrainer = async (req, res) => {
  try {
    let {
      fullName,
      email,
      password,
      contact,
      address,
      salary,
      age,
      trainerID,
      gender,
      speciality,
    } = req.body;

    let existingTrainer = await trainerModel.findOne({ email });
    if (existingTrainer) 
      return res.status(401).send("Trainer Alredy Exists");

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) 
          return res
            .send(err.message);
        else {
          let trainer = await trainerModel.create({
            fullName,
            email,
            password: hash,
            contact,
            address,
            salary,
            age,
            trainerID,
            speciality,
            gender,
          });
          res.send("Trainer Created");
        }
      });
    });
  } catch (err) {}
};

module.exports.updateTrainer = async (req, res) => {
  try {
    let { fullName,password,age, joiningDate, speciality,salary,  address, contact, email } = req.body;

    let trainer = await trainerModel.findOneAndUpdate(
      { email },
      { salary,  address, contact, fullName,password,age, joiningDate, speciality,},
      { new: true }
    );
    if (!trainer) return res.status(401).send("Something went wrong");
    res.send(trainer);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
};

module.exports.checkAttendence = async (req, res) => {
  const { email } = req.body;

  try {
    const trainer = await trainerModel.findById(email);
    if (!trainer) {
      return res.status(404).json({ message: "Trainer not found" });
    }

    res.status(200).json(trainer.attendance);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
module.exports.deleteTrainer = async (req, res) => {
  try {
    // Extract the trainer's ID from the request params
    const { id } = req.params;

    // Find and delete the trainer by their ID
    let trainer = await trainerModel.findByIdAndDelete(id);

    if (!trainer) {
      return res.status(404).send("Trainer not found");
    }

    // Respond with success message
    res.send("Trainer Deleted");
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
};


module.exports.listTrainers = async (req, res) => {
  try {
    // Fetch list of all trainers
    let trainerList = await trainerModel.find();
    
    // Get the total count of trainers
    let totalTrainers = await trainerModel.countDocuments();

    // Send response with the trainer list and total count
    res.status(200).json({
      total: totalTrainers,
      trainers: trainerList
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports.checkTrainerAttendence = async (req,res) =>{
  const {id, role} = req.params;

  try{
    const trainer = await trainerModel.findById(id);

    if(!trainer){
      return res.status(404).json({message: "Trainer not found"});
    }

    res.status(200).json(trainer.attendance || []);
  }
  catch(err){
    console.error(err);
    res.status(500).json({message: "Server error"});
  }
};


module.exports.trainerAttendence = async (req,res) =>{
  const {email, date, status } = req.body;
  try{
    const trainer = await trainerModel.findOne({email});

    // console.log(status);

    if(!trainer){
      console.log(`customer with email: ${email} not found`)
      return res.status(404).json({message: "Trainer not found"});
    }

    if(!trainer.attendance){
      trainer.attendance = [];
    }

    const existingAttendance = trainer.attendance.find(
      (att) => att.date.toDateString() === new Date(date).toDateString()
    );


    if (existingAttendance) {
      existingAttendance.status = status;  
    } else {
      trainer.attendance.push({date: new Date(date), status});
    }


    await trainer.save();
    res
      .status(200)
      .json({message: "Attendence marked successfully", trainer});
  }
  catch(err){
    console.error(err);
    res.status(500).json({message: "Server error"})
  }
};

module.exports.getTrainerDetails = async (req, res) => {
  const { id } = req.params; // Assuming email is passed as a parameter. You can also use trainerId if needed.
  try {
    // Find the trainer by email or trainerId (you can modify this based on your use case)
    let trainer = await trainerModel.findById(id); // Alternatively, you can use { _id: req.params.trainerId } for fetching by ID

    // If trainer doesn't exist, return an error message
    if (!trainer) {
      return res.status(404).json({ message: "Trainer not found" });
    }
    // Return the trainer details
    res.status(200).json(trainer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports.listTrainersAttendence = async (req,res) =>{
  try{
    let trainerList = await trainerModel.find();


    const trainerAttendanceArray = trainerList.map((trainer) => ({
      trainerId: trainer._id,
      name: trainer.fullName,
      attendance: trainer.attendance || [],
      email: trainer.email,
      role: trainer.role,
    }));

    let totalTrainers = await trainerModel.countDocuments();

    res.status(200).json({
      total: totalTrainers,
      attendanceData: trainerAttendanceArray,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({message: "Server error"})
  }
};

module.exports.trainerDetails = async (req,res) =>{
  try{
    const email = req.email;
    
    let trainer = await trainerModel.findOne({email})
    if(!trainer) {
      return res
        .status(404)
        .send("Trainer Not Found")
    }

    res.status(200).json({
      trainer
    })
  } catch(err){
    console.error(err)
    res.status(500).json({message: "server error"})
  }
}

module.exports.trainersCustomers = async (req, res) => {
  try {
    const email = req.email;

    // Find the trainer by email, populate the customers array with the plan details
    let trainer = await trainerModel.findOne({ email }).populate({
      path: 'costumer',
      populate: {
        path: 'joinedPlans', // Assuming `joinedPlans` contains a reference to a 'plan' model
        model: 'plan', // Specify the model name for the plan, e.g., 'Plan'
        select: 'planName planDetails' // Specify the fields you want to return from the plan model
      }
    });

    // Check if trainer exists
    if (!trainer) {
      return res.status(404).send("Trainer Not Found");
    }

    // Now, you can access both the customers and the plan details within `joinedPlans`
    const customersWithPlans = trainer.costumer.map(customer => {
      const plans = customer.joinedPlans.map(plan => {
        return {
          planName: plan.planName,
          planDetails: plan.planDetails,
        };
      });
      
      return {
        ...customer.toObject(), // Convert the customer object to a plain JavaScript object
        plans // Add the customer’s plans data
      };
    });

    // Send the customers data with their plans
    return res.status(200).json({ customers: customersWithPlans });
  } catch (error) {
    console.error("Error retrieving customers:", error);
    return res.status(500).send("Internal Server Error");
  }
};
