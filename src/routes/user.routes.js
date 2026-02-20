const express = require('express');
const auth = require('../middleware/authorization');
const {createUser, login, verifyUser, updateUserById} = require('../controllers/user.controller');
const userRouter = express.Router();

userRouter.post('/register', createUser); //localhost:3000/api/user/register
userRouter.post('/login', login); //localhost:3000/api/user/login
userRouter.get('/verifytoken', auth, verifyUser); //localhost:3000/api/user/verifytoken
userRouter.put('/update', auth, updateUserById); //localhost:3000/api/user/update

module.exports = userRouter;