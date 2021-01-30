const cardRouter = require('express').Router();
const { createCard, deleteCard, getCards } = require('../controllers/cards');

cardRouter.get('/cards', getCards);

cardRouter.post('/cards', createCard);

cardRouter.delete('/cards/:cardId', deleteCard);

module.exports = cardRouter;
