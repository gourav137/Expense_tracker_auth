const mongoose = require('mongoose');

const userSchema =  new mongoose.Schema({
name:{
    type:String,
    required:true
},
  email:{
    type:String,
    required:true
},
password:{
    type:String,
    required:true
},
expenses:[
    {
        text :{
            type:String,
            required:true
        },
        amount : {
            type:Number,
            required:true
        },
        createdAt:{
            type:Date,
            default:Date.now
        }

    }


]

});

const UserModel = mongoose.model('UserModel',userSchema);
module.exports = UserModel;