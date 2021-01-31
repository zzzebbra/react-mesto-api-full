const userRouter = require('express').Router();
const { getUsers, getUserById, me } = require('../controllers/users');
const { celebrate, Joi } = require('celebrate');

userRouter.get('/users/:id', celebrate({
  body: Joi.object().keys({
    id: Joi.string().length(24)
  })
}),
getUserById);

userRouter.get('/users', getUsers);

userRouter.get('/users/me', celebrate({
  body: Joi.object().keys({
    id: Joi.string().length(24)
  })
}),
 me);

module.exports = userRouter;
