const express = require('express');
const app = express();
const db = require('./Models/db');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const UserModel = require('./Models/Schema');
const AuthRouter = require('./Routes/AuthRouter');
const productRouter = require('./Routes/Productrouter');
const ExpenseRouter = require('./Routes/ExpenseRouter');
const ensureAuthentication = require('./Middlewhere/Authmiddlewhere');
app.use(bodyParser.json());
app.use(cors());
app.get('/',(req,res)=>{
    res.send("endurance homies");
});


app.use('/auth',AuthRouter);
app.use('/prod',productRouter);
app.use('/expenses',ensureAuthentication,ExpenseRouter);


app.listen(8085,()=>{
    console.log("server is running homie");
});