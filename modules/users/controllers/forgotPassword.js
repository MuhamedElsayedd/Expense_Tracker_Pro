const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const forgotPassword = async (req, res) => {
    const userModel = mongoose.model("users");
    const {email} = req.body;

    try{
        if(!email) throw new Error("Email is not Exists!");
        const user = await userModel.findOne({email});
        if(!user) throw new Error("User not found!");

       
        const resetPasswordCode = Math.floor(100000 + Math.random() * 900000);
        await userModel.updateOne({email},{$set:{resetPasswordCode}},{runValidators: true});

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 587,
            auth: {
              user: "2b3385495d5f22",
              pass: "ab05764117ed57"
            }
          });
      
          transport.sendMail({
            from: "info@expense-tracker-app.com",
            to: email,
            subject: "Rest Your Password Now!",
            text: "Your Reset Password Code is: " + resetPasswordCode,
            html: `<h1>This Email for Reseting Your Password</h1>
            <p>Your Reset Password Code is: ${resetPasswordCode}</p>
            <p>Please use this code to reset your password.</p>
            <p>If you did not request a password reset, please ignore this email.</p>
            `
          });

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