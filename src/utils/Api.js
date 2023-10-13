import { apiToken, apiURL, groupId } from "./constants"

export class Api {
  constructor (apiToken, groupId, apiURL) {
    this._url = apiURL
    this._groupId = groupId
    this._headers = {
      authorization: apiToken,
      "Content-Type": "application/json"
    }
  }

  _getResponse (res) {
    if ( res.ok ) return res.json()
    return Promise.reject(`ERROR: ${ res.status }`)
  }

  getAppInfo () {
    return Promise.all([ this.getCard(), this.getUser() ])
  }

  getCard () {
    return fetch(`${ this._url }${ this._groupId }/cards`, {
      headers: this._headers
    }).then(res => this._getResponse(res))
  }

  getUser () {
    return fetch(`${ this._url }${ this._groupId }/users/me`, {
      headers: this._headers
    }).then(res => this._getResponse(res))
  }

  getLogin () {
		return fetch(`https://auth.nomoreparties.co/${this._groupId}/users/me`, {
			headers: this._headers,
		}).then(res => this._getResponse(res))
	}

  createCard ({ name, link }) {
    return fetch(`${ this._url }${ this._groupId }/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link
      })
    }).then(this._getResponse)
  }

  updateUser ({ name, about }) {
    return fetch(`${ this._url }${ this._groupId }/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about
      })
    }).then(this._getResponse)
  }

  deleteCard (cardId) {
    return fetch(`${ this._url }${ this._groupId }/cards/${ cardId }`, {
      method: "DELETE",
      headers: this._headers
    }).then(this._getResponse)
  }


  async changeLikeCard (card, isLiked) {
    const method = isLiked ? "PUT" : "DELETE"
    return fetch(`${ this._url }${ this._groupId }/cards/${ card }/likes`,
      {
        method: method,
        headers: this._headers
      }
    ).then(this._getResponse)
  }

  likeCard (card) {
    return fetch(`${ this._url }${ this._groupId }/cards/${ card }/likes`, {
      method: "PUT",
      headers: this._headers
    }).then(this._getResponse)
  }

  removeCardLike (card) {
    return fetch(`${ this._url }${ this._groupId }/cards/${ card }/likes`, {
      method: "DELETE",
      headers: this._headers
    }).then(this._getResponse)
  }

  updateUserAvatar ({ avatar }) {
    return fetch(`${ this._url }${ this._groupId }/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar
      })
    }).then(this._getResponse)
  }
}

const api = new Api(apiToken, groupId, apiURL)

export default api
