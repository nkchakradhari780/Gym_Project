const jwt = require('jsonwebtoken')
const trainerModel = require('../models/trainer_model')

module.exports = async (req,res,next) =>{
    try {
        const token = req.cookies.token

        if(!token){
            return res.status(401).json({Message: "Unauthorized: No token provided"})
        }

        const decoded = jwt.verify(token,process.env.JWT_KEY)
        const trainer = await trainerModel
            .findById(decoded.Id)
            .select("-password");


        if(!trainer){
            return res.status(401).json({message: "Trainer Not Found"})
        }

        if(trainer.role !== 'trainer'){
            return res.status(403).josn({message: "Unauthorized Trainer"})
        }

        req.email = decoded.email;
        req.trainer = trainer;
        req.role = decoded.role;
        next();
    } 
    catch (error) {
        console.error(error)
    }
}

