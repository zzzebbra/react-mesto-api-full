const cardRouter = require('express').Router();
const { createCard, deleteCard, getCards, dislikeCard, likeCard } = require('../controllers/cards');
const { celebrate, Joi } = require('celebrate');

cardRouter.get('/cards', getCards);

cardRouter.post('/cards', celebrate ({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().regex(/https?:\/\/[www]?[a-z\-\.\_\~\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=0-9]*#?/).required(),
    })
}),
createCard);

cardRouter.delete('/cards/:cardId', celebrate ({
  body: Joi.object().keys({
    cardId: Joi.string().length(24)
  })
}),
deleteCard);


cardRouter.put('/cards/likes/:cardId', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(true),
}), likeCard);

cardRouter.delete('/cards/likes/:cardId', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(true),
}), dislikeCard);

module.exports = cardRouter;
