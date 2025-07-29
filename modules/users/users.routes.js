const express =require('express');
const register =require('./controllers/register');
const login = require('./controllers/login');

const userRouter =express.Router();


userRouter.post('/register',register);
userRouter.post('/login',login);



module.exports =userRouter;
