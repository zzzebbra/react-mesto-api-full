const router = require('express').Router();

const usersRouter = require('./users.js');
const cardsRouter = require('./cards.js');
const notFoundRouter = require('./not-found.js');

router.use(
  usersRouter,
  cardsRouter,
  notFoundRouter,
);

module.exports = router;
