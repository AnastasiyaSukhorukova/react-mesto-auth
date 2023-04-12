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
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        email,
        password
      })
    })
    .then((response) => {
      try {
        if (response.status === 200){
          return response.json();
        }
      } catch(e){
        return (e)
      }
    })
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));
  }; 

  loginUser (email, password) {
    return fetch(`${this._url}/signin`,{
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ email, password }),
    })
    .then((response => response.json()))
  .then((data) => {
    if (data.jwt){
      localStorage.setItem('jwt', data.jwt);
      return data;
    }
  })
  .catch(err => console.log(err))
}; 

  getToken (jwt) {
    return fetch(`${this._url}/users/me`,{
      method: 'GET',
      headers: {
        headers: this._headers,
        Authorization: `Bearer ${jwt}`,
      },
    })
    .then((response) => {
      try {
        if (response.status === 200){
          return response.json();
        }
      } catch(e){
        return (e)
      }
    })
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));
  }
}

const useAuth = new Auth({
  url: 'https://auth.nomoreparties.co',
  headers: {
    'Content-Type': "application/json"
  }
})

export default useAuth;