const mongoose = require('mongoose');

// eslint-disable-next-line no-useless-escape
const regex = /(https?:\/\/[www]?[a-z\-\.\_\~\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=0-9]*#?)/gi;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(avatar) {
        return avatar.match(regex);
      },
      message: 'Ссылка на картинку может содержать цифры, латинские буквы и спецсимволы. Пожалуйста, проверьте ссылку.',
    },
  },
});

module.exports = mongoose.model('user', userSchema);
