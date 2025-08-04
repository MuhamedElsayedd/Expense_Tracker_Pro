const express = require('express');
const auth = require('../../middlewares/auth');
const addIncome = require('./controllers/addInCome');
const addExpense = require('./controllers/addExpense');
const getTransactions = require('./controllers/getTransactions');
const deleteTransaction = require('./controllers/deleteTransaction');
const editTransaction = require('./controllers/editTransaction');

const transactionRouter = express.Router();

// 🔒 Protected Routes
transactionRouter.use(auth);
transactionRouter.post('/addInCome', addIncome);
transactionRouter.post('/addExpense', addExpense);
transactionRouter.get('/', getTransactions);
transactionRouter.delete('/:transaction_id', deleteTransaction);
transactionRouter.patch('/editTransaction', editTransaction);



module.exports = transactionRouter;
