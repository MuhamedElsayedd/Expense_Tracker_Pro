const addIncome = async (req,res)=>{
    res.status(200).json({
        message:"Income added successfully"
    })

}
module.exports = addIncome;