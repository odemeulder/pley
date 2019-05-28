import { GetAuthToken } from './TokenHeader'
import { ResponseHandler } from './ResponseHandler'

export const RestaurantsApi = {
  getAll: () => {
    const options = {
      method: 'GET',
      headers: { ...GetAuthToken(), 'Content-Type': 'application/json' }
    }
    return fetch(`api/restaurants`, options).then(ResponseHandler)
  }
}
