import { GetAuthToken } from './TokenHeader'
import { ResponseHandler } from './ResponseHandler'

export const RestaurantsApi = {
  getAll: () => {
    const options = {
      method: 'GET',
      headers: { ...GetAuthToken(), 'Content-Type': 'application/json' }
    }
    return fetch(`api/restaurants`, options).then(ResponseHandler)
  },
  create: (restaurant) => {
    const options = {
      method: 'POST',
      headers: { ...GetAuthToken(), 'Content-Type': 'application/json' },
      body: JSON.stringify(restaurant)
    }
    return fetch(`api/restaurants`, options).then(ResponseHandler)
  },
  update: (restaurant) => {
    const options = {
      method: 'PUT',
      headers: { ...GetAuthToken(), 'Content-Type': 'application/json' },
      body: JSON.stringify(restaurant)
    }
    return fetch(`api/restaurants`, options).then(ResponseHandler)
  }
}
