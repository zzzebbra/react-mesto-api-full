const User = require('../models/user');

// const regEx = /[0-9a-z]{24}/gi;

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.id)
    // .then((user) => {
    // if (!req.params.id.match(regEx)) res.status(400).send({ message: 'Incorrect id' }); })
    .then((user) => {
      if (user === null) {
        res.status(404).send({ message: 'Пользователя с таким ID не существует' });
      } else {
        res.send({ data: user });
      }
    })
    .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
};
