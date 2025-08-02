const mongoose = require('mongoose');
const validator = require('validator');

const addIncome = async (req, res) => {
    const userModel = mongoose.model("users");
    const transactionModel = mongoose.model("transactions");
    const { amount, remarks } = req.body;

    try {
        if (!amount) throw new Error("You missed to add amount!");
        if (!remarks) throw new Error("Remarks is required!");
        if (remarks.length < 5) throw new Error("Remarks must be at least 5 characters long!");
        if (!validator.isNumeric(amount.toString())) throw new Error("Amount must be a number!");

        await transactionModel.create({
            user_id: req.user._id,
            amount: amount,
            transaction_type: "income",
            remarks: remarks
        });
        
        await userModel.updateOne({_id: req.user._id}, {$inc: {balance: amount}},{runValidators: true});

        return res.status(200).json({
            status: "success",
            message: "Income added successfully"
        });

    } catch (error) {
        return res.status(400).json({
            message: error.message || error
        });
    }
};

module.exports = addIncome;
