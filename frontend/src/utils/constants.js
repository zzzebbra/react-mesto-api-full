const baseUrl = "http://api.zzzebbra.students.nomoreparties.space";
const baseAuthUrl = "http://api.zzzebbra.students.nomoreparties.space";
const { NODE_ENV, JWT_SECRET } = process.env;
const token = JWT_SECRET;

export {baseUrl, baseAuthUrl, token}
