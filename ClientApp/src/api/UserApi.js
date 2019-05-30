import { GetAuthToken } from './TokenHeader'
import { ResponseHandler } from './ResponseHandler'

export const UserApi = {
  login,
  logout,
  register,
  getAll
}

function getAll() {
  const options = {
    method: 'GET',
    headers: { ...GetAuthToken(), 'Content-Type': 'application/json' },
  }
  return fetch(`api/users`, options).then(ResponseHandler)
}

function updateUser(user) {
  const options = {
    method: 'PUT',
    headers: { ...GetAuthToken(), 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  }
  return fetch(`api/users/${user.id}`, options).then(ResponseHandler)
}

function login(email, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  }

  return fetch(`api/users/auth`, requestOptions)
    .then(ResponseHandler)
    .then(user => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('user', JSON.stringify(user))
      return user
    })
}

function logout() {
  localStorage.removeItem('user')
}

function register(user) {
  const requestOptions = {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  }
  return fetch(`api/users`, requestOptions).then(ResponseHandler)
}

