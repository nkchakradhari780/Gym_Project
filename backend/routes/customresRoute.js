const express = require('express')
const router = express.Router();
const upload = require('../config/multer-config');
const isLoggedin = require('../middlewares/isLoggedin');
const {
    loginCustomer,
    checkCustomerAttendence,
    customerDetails,
    customerDetailsByEmail,
    logout
} = require('../controllers/customerAuth');

const {
    getAnnouncement
} = require('../controllers/AnnouncementsAuth');

const { 
    listPlans,
    buyPlans,
    purchesedPlans,
 } = require('../controllers/plan');
 

router.get('/profile/',customerDetailsByEmail);

router.get('/checkAttendence', checkCustomerAttendence);

router.get('/announcement',getAnnouncement);

router.get('/plans/list',listPlans);

router.post('/byPlan',buyPlans);

router.get('/purchesedPlans',purchesedPlans)


module.exports = router;
