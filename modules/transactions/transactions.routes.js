const express =require('express');
const auth = require('../../middlewares/auth');
const addIncome = require('./controllers/addInCome');

const transactionRouter =express.Router();


// Protected Routes
transactionRouter.use(auth);
transactionRouter.post('/addInCome',addIncome);


module.exports =transactionRouter;
