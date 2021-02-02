/* eslint-disable max-len */
const router = require('express').Router();
const { NotFoundError } = require('../middlewares/errors');

router.all('/', (req, res, next) => {
  res.send().then(() => {
    if (res.status(404)) {
      throw new NotFoundError('Запрашиваемый ресурс не найден');
    }
  })
    .catch(next);
});

module.exports = router;
