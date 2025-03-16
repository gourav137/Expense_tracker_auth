const mongoose = require('mongoose');
require('dotenv').config();

const mongoUrl =  process.env.mongoURL;

mongoose.connect(mongoUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

const db = mongoose.connection;
db.on('connected',()=>{
    console.log("connection sucess");
});

module.exports = db;