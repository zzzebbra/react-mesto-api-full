const Card = require('../models/card');
const { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, InternalServerError } = require('../middlewares/errors');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {

  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch(next)
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId.toString())
    .then((card) => {
      if (card == null)
      throw new NotFoundError( 'Карточка не существует' )
        if (card.owner.toString() === req.user._id) {
          Card.findByIdAndRemove(req.params.cardId)
          .then((card) => {  return res.send({ data: card }) })
          throw new InternalServerError( 'На сервере произошла ошибка' )
      }
  })
  .catch(next)
};
