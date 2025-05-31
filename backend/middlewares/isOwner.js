const jwt = require('jsonwebtoken')
const ownerModel = require('../models/owner_model')
const managerModel = require('../models/manager_model')
const userModel = require('../models/user_model')

module.exports = async (req,res,next) =>{
    try {
        const token = req.cookies.token

        if(!token){
            return res.status(401).json({Message: "Unauthorized: No token provided"})
        }

        const decoded = jwt.verify(token,process.env.JWT_KEY)
        const owner = await userModel
            .findById(decoded.Id)
            .select("-password");

        
        if(!owner){
            return res.status(401).json({message: "Owner Not Found"})
        }

        if(owner.role !== 'admin'){
            return res.status(403).json({message: "Unauthorized Owner"})
        }

        req.role = decoded.role;
        req.email = decoded.email;
        req.owner = owner;
        
        next();
    } 
    catch (error) {
        console.error(error)
    }
}

