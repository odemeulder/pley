import { GetAuthToken } from './TokenHeader'
import { ResponseHandler } from './ResponseHandler'

export const ReviewsApi = {
  getAll: () => {
    const options = {
      method: 'GET',
      headers: { ...GetAuthToken(), 'Content-Type': 'application/json' }
    }
    return fetch(`api/reviews`, options).then(ResponseHandler)
  },
  create: (review) => {
    const options = {
      method: 'POST',
      headers: { ...GetAuthToken(), 'Content-Type': 'application/json' },
      body: JSON.stringify(review)
    }
    return fetch(`api/reviews`, options).then(ResponseHandler)
  },
  reply: (review) => {
    const options = {
      method: 'PUT',
      headers: { ...GetAuthToken(), 'Content-Type': 'application/json' },
      body: JSON.stringify(review)
    }
    return fetch(`api/reviews/${review.id}/reply`, options).then(ResponseHandler)
  },
  update: (review) => {
    const options = {
      method: 'PUT',
      headers: { ...GetAuthToken(), 'Content-Type': 'application/json' },
      body: JSON.stringify(review)
    }
    return fetch(`api/reviews/${review.id}/update`, options).then(ResponseHandler)
  }
}
