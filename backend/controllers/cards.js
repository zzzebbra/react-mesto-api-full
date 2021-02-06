/* eslint-disable max-len */
const Card = require('../models/card');
const { BadRequestError, NotFoundError, ForbiddenError } = require('../middlewares/errors');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((card) => res.send({ data: card }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId.toString())
    .then((card) => {
      if (card == null) throw new NotFoundError('Карточка не существует');
      if (card.owner.toString() === req.user._id) {
        Card.findByIdAndRemove(req.params.cardId)
          .then(() => res.send({ data: card }));
      } else {
        throw new ForbiddenError('Невозможо удалить чужую карточку');
      }
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).populate(['likes'])
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет карточки');
      } return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Возможно, некорректный ID');
      } next(err);
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).populate(['likes'])
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет карточки');
      } return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Возможно, некорректный ID');
      } next(err);
    })
    .catch(next);
};
