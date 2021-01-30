import {baseUrl, baseAuthUrl, token} from './constants'

const handleOriginalResponse = (res) => {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}

class Api {
  constructor(baseUrl, baseAuthUrl, token) {
    this.baseUrl = baseUrl;
    this.token = token;
    this.baseAuthUrl = baseAuthUrl;
  }

  signup(password, email) {
    return fetch(`${this.baseAuthUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password: password,
        email: email
      })
    })
    .then(handleOriginalResponse)
  }

  login(password, email) {
    return fetch(`${this.baseAuthUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password: password,
        email: email
      })
    })
    .then(handleOriginalResponse)
  }

  getUserData(jwt) {
    return fetch(`${this.baseAuthUrl}/users/me`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      }
    })
    .then(handleOriginalResponse)
  }

  getCards() {
    return fetch(`${this.baseUrl}cards`, {
      method: 'GET',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json',
      }
    })
    .then(handleOriginalResponse)
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}users/me`, {
      method: 'GET',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json',
      }
    })
    .then(handleOriginalResponse)
  }

  setUserInfo(name, about) {
    return fetch(`${this.baseUrl}users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then(handleOriginalResponse)
  }

  addNewCard(name, link) {
    return fetch(`${this.baseUrl}cards`, {
      method: 'POST',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then(handleOriginalResponse)
  }

  deleteMyCard(cardId) {
    return fetch(`${this.baseUrl}cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json',
      }
    })
    .then(handleOriginalResponse)
  }

  changeLikeCardStatus(cardId, isLiked) {
    let methodValue;
    isLiked ? (methodValue = "DELETE") : (methodValue = "PUT");
    return fetch(`${this.baseUrl}cards/likes/${cardId}`, {
      method: methodValue,
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json',
      }
    })
    .then(handleOriginalResponse)
  }

  updateAvatar(link) {
    return fetch(`${this.baseUrl}users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: link
      })
    })
    .then(handleOriginalResponse)
  }

}

const api = new Api(baseUrl, baseAuthUrl, token);

export default api;
