const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes/index');

const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
//const { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, InternalServerError } = require('./middlewares/errors);

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
app.use(bodyParser.json());
app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.use(routes);

app.use((err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message
    });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Alive at port:', PORT);
});
