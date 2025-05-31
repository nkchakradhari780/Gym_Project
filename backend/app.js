const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

// Database Connection
const db = require('./config/mongoose-connection');

// Routes
const indexRoute = require('./routes/indexRoute');
const customerRoute = require('./routes/customresRoute');
const trainersRoute = require('./routes/trainersRoute');
const managerRoute = require('./routes/managersRoute');
const ownerRoute = require('./routes/ownersRoute');
const transectionsRoute = require('./routes/transectionsRoute');

// Middlewares
const isOwner = require('./middlewares/isOwner');
const isCustomer = require('./middlewares/isCustomer');
const isManager = require('./middlewares/isManager');
const isTrainer = require('./middlewares/isTrainer');

const transectionModel = require("./models/transection_model");


// Middleware Configurations
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:3000', // Frontend URL
    credentials: true, // Allow credentials
}));
app.use(express.static(path.join(__dirname, 'public')));

// View Engine
app.set('view engine', 'ejs');



// Routes
app.use('/', indexRoute);
app.use('/customer', isCustomer, customerRoute);
app.use('/trainer', isTrainer, trainersRoute);
app.use('/manager', isManager, managerRoute);
app.use('/owner', isOwner, ownerRoute);
app.use('/transections',transectionsRoute);

// Additional Routes
app.get('/loginpage', (req, res) => {
    res.render('login');
});
 
// Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 
