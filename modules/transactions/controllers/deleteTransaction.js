const mongoose = require('mongoose');
const validator = require('validator');

const deleteTransaction = async (req, res) => {
    const transactionModel = mongoose.model("transactions");
    const userModel = mongoose.model("users"); 

    const { transaction_id } = req.params;

    try {
        if (!validator.isMongoId(transaction_id.toString()))
            throw "Please Provide Valid ID";

        const getTransaction = await transactionModel.findOne({ _id: transaction_id });

        if (!getTransaction)
            throw "Transaction isn't Found";

        if (getTransaction.transaction_type === "income") {
            // income Logic
            await userModel.updateOne(
                { _id: getTransaction.user_id },
                { $inc: { balance: -1 * getTransaction.amount } },
                { runValidators: true }
            );
        } else {
            // expense Logic
            await userModel.updateOne(
                { _id: getTransaction.user_id },
                { $inc: { balance: getTransaction.amount } },
                { runValidators: true }
            );
        }

        await transactionModel.deleteOne({ _id: transaction_id });

        res.status(200).json({
            status: "Success",
            message: "Transaction Deleted Successfully!"
        });
    } catch (err) {
        res.status(400).json({
            status: "failed",
            message: err.message || err
        });
    }
};

module.exports = deleteTransaction;
