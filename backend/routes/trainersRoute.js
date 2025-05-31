const express = require('express')
const router = express.Router();
const upload = require('../config/multer-config');
const {
    checkAttendence,
    logout,
    trainerDetails,
    trainersCustomers
} = require('../controllers/trainerAuth');

const {
    customerAttendence,
    listCustomers
} = require('../controllers/customerAuth')

const {
    updateEquipment,
    listEquipments,
    equipmentStatus,
} = require('../controllers/equipment');


const {
    listPlans,
    getPlanById
} = require('../controllers/plan');

const { getAnnouncement } = require('../controllers/AnnouncementsAuth');


// Route to get trainer's attendance records
router.get('/',trainerDetails);

router.get('/trainer/attendance',checkAttendence);


router.get('/customer',trainersCustomers);

router.post('/customer/attendence',customerAttendence);


router.get('/equipment',listEquipments);

router.post('/equipment/update',updateEquipment);


router.get('/plans', listPlans);

router.get('/plan/:id', getPlanById); 


router.get('/announcement',getAnnouncement)



module.exports = router;