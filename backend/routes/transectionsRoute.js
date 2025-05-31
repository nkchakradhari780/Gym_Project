const express = require('express')
const router = express.Router();
const upload = require('../config/multer-config');
const isLoggedin = require('../middlewares/isLoggedin');

const {
    listTransections,
    addTransection,
} = require('../controllers/transactions');


router.get('/',listTransections);

router.post('/add',addTransection)

module.exports = router;