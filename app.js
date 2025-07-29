const express = require('express');
const app =express();
require('./handlers/errorHandler');
const mongoose =require('mongoose');
const errorHandler = require('./handlers/errorHandler');
const userRouter = require('./modules/users/users.routes');
require("./models/usermodel");
app.use(express.json());
require('dotenv').config();



mongoose.connect(process.env.mongo_connection,{}).then(()=>{
    console.log("Connection to MongoDB Succesful!")
}).catch(()=>{
    console.log("Connection to MongoDB Failed!")
});

app.use('/api/users',userRouter);

app.use(errorHandler);

// app.use(errorHandler());

app.listen(8000,()=>{
    console.log("Server is Running Successfuly!");
});