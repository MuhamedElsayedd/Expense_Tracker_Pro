const express = require('express');
const app =express();
require('./handlers/errorHandler');
const mongoose =require('mongoose');
const errorHandler = require('./handlers/errorHandler');
const userRouter = require('./modules/users/users.routes');
const transactionRouter = require('./modules/transactions/transactions.routes');
require("./models/user.model");
require("./models/transaction.model");
app.use(express.json());
require('dotenv').config();
mongoose.connect(process.env.mongo_connection,{});

app.use('/api/users',userRouter);
app.use('/api/transactions',transactionRouter);
app.use(errorHandler);


app.listen(8000,()=>{
    console.log("Server is Running Successfuly!");
});