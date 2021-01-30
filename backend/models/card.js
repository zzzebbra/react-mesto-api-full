const mongoose = require('mongoose');
const user = require('./user');

// eslint-disable-next-line no-useless-escape
const regex = /(https?:\/\/[www]?[a-z\-\.\_\~\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=0-9]*#?)/gi;

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(avatar) {
        return avatar.match(regex);
      },
      message: 'Ссылка на картинку может содержать цифры, латинские буквы и спецсимволы. Пожалуйста, проверьте ссылку.',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: user,
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: user,
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
