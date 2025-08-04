const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const emailManager = require('../../../managers/emailManager');

const resetPassword = async (req, res, next) => {
  try {
    const userModel = mongoose.model("users");
    const { email, new_password, resetPasswordCode } = req.body;

    if (!email) throw new Error("Email is required!");
    if (!new_password) throw new Error("New Password is required!");
    if (!resetPasswordCode) throw new Error("You missed Reset Code!");

    const getUserWithResetCode = await userModel.findOne({
      email: email,
      resetPasswordCode: resetPasswordCode, 
    });

    if (!getUserWithResetCode) throw new Error("Reset Code doesn't Match");

    const hashedPassword = await bcrypt.hash(new_password, 12);

    await userModel.updateOne(
      { email: email },
      {
        password: hashedPassword,
        resetPasswordCode: ""
      },
      { runValidators: true }
    );

    await emailManager(
      email,
      "Password Reseted Successfuly!",
      "<h1>Password Reseted Successfuly</h1>,<br>Go Login Our App and Enjoy!",
      "Password Reseted Successfuly!"
    );

    res.status(200).json({
      status: "success",
      message: "Password reseted successfully!",
    });

  } catch (err) {
    res.status(404).json({
        status:"Error",
        message:err.message
    })
  }
};

module.exports = resetPassword;