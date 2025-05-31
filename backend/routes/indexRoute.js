const express = require('express');
router = express.Router();
const {
    registerOwner,
} = require('../controllers/ownerAuth')
const {loginHandler} = require('../controllers/loginAuth');

router.post('/login', loginHandler);


console.log(process.env.NODE_ENV);
if(process.env.NODE_ENV === 'development'){
    router.post('/create/owner', registerOwner);
}


router.post('/logout', (req,res)=>{
    try{
        res.clearCookie('token')
        res.status(200).json({message:"Logged Out Successfully"})
    }
    catch(err){
        res.status(500).json({success: false, message:"Internal server error"})
        console.error(err);
    }
})

module.exports = router;