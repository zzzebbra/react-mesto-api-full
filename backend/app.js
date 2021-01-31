const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors, Joi, celebrate } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
require('dotenv').config();

const app = express();

const routes = require('./routes/index');

const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());

app.use(requestLogger);

app.post('/signin', celebrate ({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    })
}), login);

app.post('/signup', celebrate ({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(/https?:\/\/[www]?[a-z\-\.\_\~\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=0-9]*#?/),
    })
}), createUser);

app.use(auth);

app.use(routes);

app.use(errorLogger);

app.use(errors()); // обработчик ошибок celebrate

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
