const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtManger  = require('../../../mangers/jwtManger');

const login = async (req, res) => {
    const { email, password } = req.body;
    const userModel = mongoose.model("users");

    try {
        const getUser = await userModel.findOne({ email });
        if (!getUser) {
            return res.status(404).json({ message: "Email doesn't exist" });
        }

        const match = await bcrypt.compare(password, getUser.password);
        if (!match) {
            return res.status(401).json({ message: "Incorrect password" });
        }

       const token = jwtManger(getUser);

        return res.status(200).json({
            message: "User Logined successfuly",
            accessToken: token
        });

    } catch (err) {
        console.error("Login Error:", err);
        return res.status(500).json({
            message: "Internal Server Error",
            error: err.message || err
        });
    }
};

module.exports = login;
