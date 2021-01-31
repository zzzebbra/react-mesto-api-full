const userRouter = require('express').Router();
const { getUsers, getUserById, me } = require('../controllers/users');

userRouter.get('/users/:id', getUserById);

userRouter.get('/users', getUsers);

userRouter.get('/users/me', me);

module.exports = userRouter;
