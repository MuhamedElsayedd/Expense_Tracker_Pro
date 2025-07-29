const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); 
const register = async (req, res) => {
  const userModel = mongoose.model("users");
  const { name, email, password, confirm_password, balance } = req.body;

  try {
    if (!name) throw "Name is required!";
    if (!email) throw "Email is required!";
    if (password !== confirm_password) throw "Password and confirm password don't match!";
    if (password.length <= 5) throw "Password length must be greater than 5 characters";

    const getDuplicateEmail = await userModel.findOne({ email });
    if (getDuplicateEmail) throw "This email already exists!";


    const hashedPassword = await bcrypt.hash(password,12);
    const data = await userModel.create({
      name:name,
      email:email,
      password:hashedPassword,
      balance:balance,
    });

    return res.status(201).json({
      status: 201,
      message:"User Registered Successfuly!",
      data: data
    });

  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e,
    });
  }
};

module.exports = register;