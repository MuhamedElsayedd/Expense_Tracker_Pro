const mongoose =require('mongoose');
const { type } = require('os');

const usersSchema = new mongoose.Schema({
    name:{
        type:String,
        require:[true,"Full name is required!"]
    },
    email:{
        type:String,
        require:[true,"email is required!"]
    },
    password:{
        type:String,
        require:[true,"password is requried!"]
    },
    balance:{
        type:Number,
        require:[true,"Add your balance"],
        default:0
    }
},
   {
        timestamps:true,
   }

);

const usersModel =mongoose.model('users',usersSchema);
module.exports=usersModel;