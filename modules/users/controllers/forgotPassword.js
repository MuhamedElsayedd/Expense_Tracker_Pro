const mongoose = require('mongoose');
const emailManager = require('../../../managers/emailManager');
const forgotPassword = async (req, res) => {
    const userModel = mongoose.model("users");
    const {email} = req.body;

    try{
        if(!email) throw new Error("Email is not Exists!");
        const user = await userModel.findOne({email});
        if(!user) throw new Error("User not found!");

       
        const resetPasswordCode = Math.floor(100000 + Math.random() * 900000);
        await userModel.updateOne({email},{$set:{resetPasswordCode}},{runValidators: true});

          await emailManager(
            email,
            "Your Reset Password Code is: " + resetPasswordCode,
            `<h1>This Email for Reseting Your Password</h1>
            <p>Your Reset Password Code is: ${resetPasswordCode}</p>
            <p>Please use this code to reset your password.</p>
            <p>If you did not request a password reset, please ignore this email.</p>`,
            "Rest Your Password Now!"
          );

        res.status(200).json({
            status: "success",
            message: "Rest Password Email sent successfully!",
        });
    }
    catch(error){
        return res.status(400).json({
            status: "error",
            message: error.message
        });
    }

}

module.exports = forgotPassword;