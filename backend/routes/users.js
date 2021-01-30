const userRouter = require('express').Router();
const { getUsers, getUserById, createUser } = require('../controllers/users');

userRouter.get('/users/:id', getUserById);

userRouter.get('/users', getUsers);

userRouter.post('/users', createUser);

module.exports = userRouter;
