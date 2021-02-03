import baseUrl from './constants';

const handleOriginalResponse = (res) => {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
};

class Api {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  signup(password, email) {
    return fetch(`${this.baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password,
        email,
      }),
    })
      .then(handleOriginalResponse);
  }

  login(password, email) {
    return fetch(`${this.baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password,
        email,
      }),
      credentials: 'include',
    })
      .then(handleOriginalResponse);
  }

  getUserData(jwt) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
    })
      .then(handleOriginalResponse);
  }

  getCards(jwt) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
    })
      .then(handleOriginalResponse);
  }

  getUserInfo(jwt) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
    })
      .then(handleOriginalResponse);
  }

  setUserInfo(jwt, name, about) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        about,
      }),
    })
      .then(handleOriginalResponse);
  }

  addNewCard(jwt, name, link) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        link,
      }),
    })
      .then(handleOriginalResponse);
  }

  deleteMyCard(jwt, cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
    })
      .then(handleOriginalResponse);
  }

  changeLikeCardStatus(jwt, cardId, isLiked) {
    let methodValue;
    isLiked ? (methodValue = 'DELETE') : (methodValue = 'PUT');
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: methodValue,
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
      params: {
        cardId: this.cardId,
      },
    })
      .then(handleOriginalResponse);
  }

  updateAvatar(jwt, link) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: link,
      }),
    })
      .then(handleOriginalResponse);
  }
}

const api = new Api(baseUrl);

export default api;
