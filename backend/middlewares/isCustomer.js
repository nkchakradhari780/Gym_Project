const jwt = require('jsonwebtoken')
const customerModel = require('../models/costumer_model')

module.exports = async (req,res,next) =>{
    try {
        const token = req.cookies.token

        if(!token){
            return res.status(401).json({Message: "Unauthorized: No token provided"})
        }

        const decoded = jwt.verify(token,process.env.JWT_KEY)
        const customer = await customerModel
            .findById(decoded.Id)
            .select("-password");

        if(!customer){
            return res.status(401).json({message: "Customer Not Found"})
        }

        if(customer.role !== 'member'){
            return res.status(403).json({message: "Unauthorized Customer"})
        }
        
        
        req.customer = customer;
        req.role = decoded.role;
        req.email = decoded.email;
        
        next();
    } 
    catch (error) {
        console.error(error)
    }
}

