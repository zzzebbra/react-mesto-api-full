const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, getUserById, updateAvatar, me, updateMe,
} = require('../controllers/users');

userRouter.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateMe);

userRouter.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    // eslint-disable-next-line no-useless-escape
    avatar: Joi.string().regex(/https?:\/\/[www]?[a-z\-\.\_\~\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=0-9]*#?/).required(),
  }),
}), updateAvatar);

userRouter.get('/users/me', me);

userRouter.get('/users/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).required().hex(),
  }),
}),
getUserById);

userRouter.get('/users', getUsers);

module.exports = userRouter;
