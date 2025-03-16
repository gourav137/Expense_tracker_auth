const express = require('express');
const ensureAuthentication = require('../Middlewhere/Authmiddlewhere');
const router = express.Router();

router.get('/', ensureAuthentication,(req,res)=>{
    console.log('logged in user is -------', req.user);
    res.status(200).json([
        {
            name:"mobile",
            price:10000
        },
        {
            name:"tv",
            price:11111
        }
    ]);
});

module.exports = router;