const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { NODE_ENV, JWT_SECRET } = process.env;
const { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, InternalServerError } = require('../middlewares/errors');

// const regEx = /[0-9a-z]{24}/gi;

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch(next)
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.id)
    // .then((user) => {
    // if (!req.params.id.match(regEx)) res.status(400).send({ message: 'Incorrect id' }); })
    .then((user) => {
      if (user === null) {
        throw new NotFoundError( 'Пользователя с таким ID не существует' )
      } else {
        res.send({ data: user });
      }
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  if(User.findOne({email: req.email})) {
    throw new ConflictError( 'Пользователь с таким email уже зарегистрирован' )
  }
  const { email, password, name, about, avatar } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
    User.create({ name, about, avatar,
    email: email,
    password: hash, // записываем хеш в базу
  })
      .then((user) => { res.send({data: { id: user._id, email: user.email}}) })
      .catch(next);
  })
  .catch(next)
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
  .then((user) => {
    // создадим токен
    const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', {expiresIn: '7d'});

    // вернём токен
    res.send({ token });
    return token
  })
  .catch(() => {throw new UnauthorizedError( 'Неправильный логин или пароль. Проверьте введённые данные' )})
  .catch(next);
}

module.exports.me = (req, res, next) => {
  const userId = req.user._id;
  User.findOne({ _id: userId })
    .then((user) => { return res.send({ data: user }); })
    .catch(next);
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const userId = req.user._id;
  User.findOneAndUpdate({ _id: userId }, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.updateMe = (req, res, next) => {
  const { name, about } = req.body;
  const userId = req.user._id;
  User.findOneAndUpdate({ _id: userId }, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch(next);
};
