const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const jwtManger = require('../../../mangers/jwtManger');

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

    // Looking to send emails in production? Check out our Email API/SMTP product!
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
      subject: "Welcome to Expense Tracker Pro App",
      text: "Welcome to our app",
      html: `<h1>Welcome to Expense Tracker Pro App</h1>
      <p>Thank you for registering with us. We are glad to have you on board.</p>
      <p>Your account has been created successfully.</p>
      `
    });
    

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
