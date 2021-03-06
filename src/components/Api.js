export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._token = options.headers.authorization;
    this._contentType = options.headers['Content-Type'];
  }

  _resultHandler(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }


  getInitialCards() {
    return fetch(this._baseUrl + '/cards', {
      headers: {
        authorization: this._token
      }
    })
      .then(res => this._resultHandler(res));
  }

  getUserInfo() {
    return fetch(this._baseUrl + '/users/me', {
      headers: {
        authorization: this._token
      }
    }).then(res => this._resultHandler(res));

  }

  setUserInfo(name, about) {
    return fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': this._contentType
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    }).then(res => this._resultHandler(res));
  }

  setUserAvatar(src) {
    return fetch(this._baseUrl + '/users/me/avatar', {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': this._contentType
      },
      body: JSON.stringify({
        avatar: src
      })
    }).then(res => this._resultHandler(res));

  }

  addNewCard(name, link) {
    return fetch(this._baseUrl + '/cards', {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': this._contentType
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    }).then(res => this._resultHandler(res));
  }

  deleteCard(id) {
    return fetch(this._baseUrl + '/cards/' + id, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    }).then(res => this._resultHandler(res));
  }

  likeCard(id) {
    return fetch(this._baseUrl + '/cards/likes/' + id, {
      method: 'PUT',
      headers: {
        authorization: this._token
      }
    }).then(res => this._resultHandler(res));
  }

  dislikeCard(id) {
    return fetch(this._baseUrl + '/cards/likes/' + id, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    }).then(res => this._resultHandler(res));
  }
}
