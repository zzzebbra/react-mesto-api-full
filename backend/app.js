const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { errors, Joi, celebrate } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
require('dotenv').config();

const routes = require('./routes/index');

const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');

// const whitelist = ['https://zzzebbra.students.nomoreparties.space', 'http://www.zzzebbra.students.nomoreparties.space', 'http://localhost:3001'];
// const corsOptions = {
//   origin(origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
// };

const corsOptions = {
  origin: [
    'http://localhost:3000', 'http://localhost:3001',
    'https://zzzebbra.students.nomoreparties.space', 'https://www.zzzebbra.students.nomoreparties.space', 'http://www.zzzebbra.students.nomoreparties.space',
    'http://zzzebbra.students.nomoreparties.space',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

const { PORT = 3000 } = process.env;

const app = express();

app.use(cors(corsOptions));
// app.use(cors());

app.use((req, res, next) => {
  res.headers('Access-Control-Allow-Origin', '*');
  res.headers('Access-Control-Allow-Headers', '*');
  res.headers('Access-Control-Allow-Vethods', 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') {
    res.send(200);
  }
  next();
});

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());

app.use(requestLogger);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    // eslint-disable-next-line no-useless-escape
    avatar: Joi.string().regex(/https?:\/\/[www]?[a-z\-\.\_\~\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=0-9]*#?/),
  }),
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
        ? `На сервере произошла ошибка ${err}`
        : message,
    });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Alive at port:', PORT);
});
