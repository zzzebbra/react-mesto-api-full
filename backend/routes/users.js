const userRouter = require('express').Router();
const { getUsers, getUserById, updateAvatar, me, updateMe } = require('../controllers/users');
const { celebrate, Joi } = require('celebrate');

userRouter.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateMe);

userRouter.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    // eslint-disable-next-line no-useless-escape
    avatar: Joi.string().required(),
  }),
}), updateAvatar);

userRouter.get('/users/me', celebrate({
  body: Joi.object().keys({
    id: Joi.string().length(24)
  })
}),
 me);

userRouter.get('/users/:id', celebrate({
  body: Joi.object().keys({
    id: Joi.string().length(24)
  })
}),
getUserById);


userRouter.get('/users', getUsers);



module.exports = userRouter;
