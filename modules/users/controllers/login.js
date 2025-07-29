const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const login = async (req,res) =>{
    const{email,password} =req.body;
    const userModel =mongoose.model("users");

    try{
        const getUser = await userModel.findOne({
            email:email
        });
        if(!getUser) throw "Email isn't exists in the System";

        const comparePassword = await bcrypt.compare(password,getUser.password);
        if(!comparePassword) throw "Password and Email doesn't Match";
    
        res.status(201).json({
            status:201,
            message:"User Registered Successfuly!"
        });
        return;

    }
    catch(e)
    {
        res.status(404).json({
            status:404,
            message:e
        })
    }
   

   

    

}

module.exports =login;