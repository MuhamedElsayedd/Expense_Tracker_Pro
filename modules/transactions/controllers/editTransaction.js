const mongoose = require('mongoose');
const validator = require('validator');

const editTransaction = async (req, res) => {
  const transactionModel = mongoose.model("transactions");
  const userModel = mongoose.model("users");

  const { transaction_id, amount, remarks } = req.body;

  try {
    if (!transaction_id) throw "Transaction id is required!";
    if (!validator.isMongoId(transaction_id.toString()))
      throw "Please provide a valid ID";

    const getTransaction = await transactionModel.findOne({ _id: transaction_id });

    if (!getTransaction) throw "Transaction isn't found";

    // التحقق من البيانات الجديدة
    if (amount == null) throw "Amount is required!";
    if (amount <= 0) throw "Amount must be greater than 0";
    if (!remarks || remarks.length < 3) throw "Remarks must be at least 3 characters";

    // تعديل الرصيد بناءً على الفرق
    const oldAmount = getTransaction.amount;
    const diff = amount - oldAmount;

    if (getTransaction.transaction_type === "income") {
      await userModel.updateOne(
        { _id: getTransaction.user_id },
        { $inc: { balance: diff } }
      );
    } else {
      // expense
      await userModel.updateOne(
        { _id: getTransaction.user_id },
        { $inc: { balance: -diff } }
      );
    }

    // تحديث المعاملة نفسها
    await transactionModel.updateOne(
      { _id: transaction_id },
      {
        $set: {
          amount: amount,
          remarks: remarks
        }
      },
      { runValidators: true }
    );

    res.status(200).json({
      status: "success",
      message: "Transaction updated successfully!"
    });

  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message || err
    });
  }
};

module.exports = editTransaction;
