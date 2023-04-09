class Auth {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  _handleResponse(res) {
    if(res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`)
  }

  registerUser (email, password) {
    return fetch(`${this._url}/signup`,{
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: this._headers
    })
    .then(this._handleResponse);
  }

  loginUser (email, password) {
    return fetch(`${this._url}/signin`,{
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: this._headers
    })
  }

  getToken (jwt) {
    return fetch(`${this._url}/users/me`,{
      method: 'GET',
      headers: {
        headers: this._headers,
        Authorization: `Bearer ${jwt}`,
      },
    })
  }
}

const useAuth = new Auth({
  url: 'https://auth.nomoreparties.co',
  headers: {
    'Content-Type': "application/json"
  }
})

export default useAuth;