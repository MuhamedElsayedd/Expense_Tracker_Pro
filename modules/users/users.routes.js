const express =require('express');
const register =require('./controllers/register');
const login = require('./controllers/login');
const userDashboard = require('./controllers/userDashboard');
const auth = require('../../middlewares/auth');

const userRouter =express.Router();


userRouter.post('/register',register);
userRouter.post('/login',login);


// Protected Routes

userRouter.use(auth);
userRouter.get('/dashboard',userDashboard);


module.exports =userRouter;
