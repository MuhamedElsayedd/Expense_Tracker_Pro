const userDashboard = (req,res) => {
    res.status(200).json({
        status:200,
        message:"Hello from User Dashboard",
    });
}

module.exports =userDashboard;