const UserModel = require("../Models/Schema");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

require('dotenv').config();
const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            res.status(409).json({ 
                success:'false',
                message: 'email is already registered try login' });
        }
        const newUser = new UserModel({ name, email, password });
        newUser.password = await bcrypt.hash(password, 10);
        await newUser.save();
        console.log('data saved in the data base ');
        res.status(201).json({ 
            success:'true',
            message: 'signup sucess' });

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ 
            success:'false',
            message: 'internal server eror' });
    }
}


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            res.status(409).json({ 
                success:'false',
                message: 'email or pass is wrong' });
        }
      const isPasswordEqual = await bcrypt.compare(password,user.password);
      if(!isPasswordEqual){
        res.status(409).json({ 
            success:'false',
            message: 'email or pass is wrong'
               });
      }
      const jwtToken = jwt.sign({email:user.email, _id:user._id},
        
   process.env.JWT_SECRET,
        {
            expiresIn:'24h'
        }
      )
        
        res.status(201).json({
            success:'true',
            message: 'Login sucess',
            jwtToken,
            email,
            name:user.name
         });
    }
    catch (err) {
console.log(err);
res.status(500).json(
    {
        success:'false',
        message:'login failed'
        
    }
    );
    };


    }


module.exports = {
    signup,
    login
}