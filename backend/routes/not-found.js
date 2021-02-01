const router = require('express').Router();
const { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, InternalServerError } = require('../middlewares/errors');

router.all('/', (req, res, next) => {
  if(res.status(404)) {
    throw new NotFoundError('Запрашиваемый ресурс не найден' )
    .catch(next)
  };
});

module.exports = router;
