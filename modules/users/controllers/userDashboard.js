const mongoose = require('mongoose');
const userDashboard = async (req, res) => {

    const userModel = await mongoose.model("users");
    const transactionModel = await mongoose.model("transactions");
    const getUser = await userModel.findOne({
        _id: req.user._id
    }).select("name email balance")

    const getTransactions = await transactionModel.find({
        user_id: req.user._id
    }).sort({createdAt: -1});


    res.status(200).json({
        status: "success",
        data: getUser,
        transactions: getTransactions
    });
}

module.exports = userDashboard;