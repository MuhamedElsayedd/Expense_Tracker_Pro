const express =require('express');
const auth = require('../../middlewares/auth');
const addIncome = require('./controllers/addInCome');
const addExpense = require('./controllers/addExpense');

const transactionRouter =express.Router();


// Protected Routes
transactionRouter.use(auth);
transactionRouter.post('/addInCome',addIncome);
transactionRouter.post('/addExpense',addExpense);


module.exports =transactionRouter;
