const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwtManger = require('../../../managers/jwtManger');
const emailManager = require('../../../managers/emailManager');

const register = async (req, res) => {
  const userModel = mongoose.model("users");
  const { name, email, password, confirm_password, balance } = req.body;

  try {
    // Basic validation
    if (!name) throw new Error("Name is required!");
    if (!email) throw new Error("Email is required!");
    if (!password || !confirm_password) throw new Error("Password and confirmation are required!");
    if (password !== confirm_password) throw new Error("Passwords do not match!");
    if (password.length <= 5) throw new Error("Password must be longer than 5 characters.");

    const existingUser = await userModel.findOne({ email });
    if (existingUser) throw new Error("Email is already registered!");

    const hashedPassword = await bcrypt.hash(password, 12);

    const userCreated = await userModel.create({
      name,
      email,
      password: hashedPassword,
      balance: balance ?? 0,
    });

    const token = jwtManger(userCreated);

    await emailManager(
      email,
      "Welcome to our app",
      "Welcome to Expense Tracker Pro App,<br>Thank you for registering with us. We are glad to have you on board",
      "Welcome to Expense Tracker Pro App"
    );
    

    return res.status(201).json({
      status: "success",
      message: "User registered successfully!",
      accessToken: token,
    });

  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message || "Something went wrong!",
    });
  }
};

module.exports = register;
