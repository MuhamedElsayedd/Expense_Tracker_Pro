const mongoose = require('mongoose');
const userDashboard = async (req,res) => {
    // console.log(req.user);

    const userModel = await mongoose.model("users");
    const getUser = await userModel.findOne({
        _id:req.user._id
    }).select("name email balance")


    res.status(200).json({
        status:"success",
        data:getUser,
    });
}

module.exports =userDashboard;