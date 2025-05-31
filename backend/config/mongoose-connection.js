const mongoose = require('mongoose');
// const config = require("config");

const dbgr = require("debug")("development:mongoose");

mongoose
.connect("mongodb://127.0.0.1:27017/gymwebsite")
.then(()=>{
    console.log("connected");
})
.catch((err)=>{
    dbgr(err.message)
})

module.exports = mongoose.connection;

// mongoose.connect('mongodb://127.0.0.1:27017/gymwebsite');
