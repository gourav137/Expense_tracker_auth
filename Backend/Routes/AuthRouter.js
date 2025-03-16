// const Router = require('express').Router();

// const { signupValidation, loginValidation } = require('../Middlewhere/AuthValidation');
// const { signup } = require('../Controllers/AuthController');


// //Router.post('/login',loginValidation);

// Router.post('/signup',signupValidation,signup);

// module.exports = Router;




const express = require('express');
const Router = express.Router();

const { signupValidation, loginValidation } = require('../Middlewhere/AuthValidation');
const { signup, login } = require('../Controllers/AuthController');

// Signup route with validation
Router.post('/signup', signupValidation, signup);

// Uncomment this when the login controller is ready
 Router.post('/login', loginValidation, login);

module.exports = Router;
