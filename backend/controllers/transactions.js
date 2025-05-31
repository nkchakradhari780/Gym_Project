const transectionModel = require("../models/transection_model");

module.exports.listTransections = async (req,res) =>{
  try {
    let transectionList = await transectionModel.find().populate("costumer");
    // console.log("transection List:",transectionList);

    let totalTransections = await transectionModel.countDocuments();

    res.status(200).json({
      total: totalTransections,
      transections: transectionList,
      
    })
  } catch (err) {
    console.error(err);
    res.status(500).json({message: "Server Error"})
  }
};

module.exports.addTransection = async (req,res) =>{
  try{
    const {
      costumer,
      amount,
      type, 
      status,
      description,
      transactionDate,
    } = req.body;
    
    if(!amount || !type || !status || !transactionDate){
      return res.status(400).json({error: "All Fields are required"})
    }

    let newTransaction = await transectionModel.create({
      costumer,
      amount,
      type, 
      status,
      description,
      transactionDate,
    });

    return res.status(201).json(newTransaction);

  } catch (error) {
    console.error(err.message);
    return res.status(500).json({error: "Server Error"})
  }
}