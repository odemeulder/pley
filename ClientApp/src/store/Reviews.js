import { ReviewsApi } from '../api/ReviewsApi'
import { alertActions } from './Alerts'
import history from '../helpers/history'

const fetchAllReviewsRequest = "FETCH_ALL_REVIEWS_REQUEST"
const fetchAllReviewsSuccess = "FETCH_ALL_REVIEWS_SUCCESS"
const fetchAllReviewsFail = "FETCH_ALL_REVIEWS_FAIL"
const createReviewSuccess = "CREATE_REVIEW_SUCCESS"
const createReviewFail = "CREATE_REVIEW_FAIL"
const updateReviewSuccess = "REPLY_REVIEW_SUCCESS"
const updateReviewFail = "REPLY_REVIEW_FAIL"

// action creators
export const reviewActions = {

  fetchAllReviews() {
    return dispatch => {
      dispatch(alertActions.clearAlerts())
      dispatch({ type: fetchAllReviewsRequest })
      ReviewsApi.getAll().then(
        data => {
          dispatch({ type: fetchAllReviewsSuccess, Reviews: data })
        },
        error => {
          dispatch({ type: fetchAllReviewsFail, error } )
          dispatch(alertActions.alertError(error))
        }
      )
    }
  },

  createReview(review) {
    return dispatch => {
      dispatch(alertActions.clearAlerts())
      ReviewsApi.create(review).then(
        data => {
          dispatch({type: createReviewSuccess, review: data})
          history.push(`/restaurants/${review.restaurant.id || review.restaurantId}`)
        },
        error => {
          dispatch({ type: createReviewFail, error } )
          dispatch(alertActions.alertError(error))
        }
      )
    }
  },

  replyReview(review) {
    return dispatch =>
    {
      dispatch(alertActions.clearAlerts())
      ReviewsApi.reply(review).then(
        data => {
          dispatch({type: updateReviewSuccess, review: data})
          history.push(`/restaurant/${review.restaurantId || review.restaurant.id}`)
        },
        error => {
          dispatch({ type: updateReviewFail, error } )
          dispatch(alertActions.alertError(error))
        }
      )
    }
  },

  updateReview(review) {
    return dispatch =>
    {
      dispatch(alertActions.clearAlerts())
      ReviewsApi.reply(review).then(
        data => {
          dispatch({type: updateReviewSuccess, review: data})
          history.push(`/admin/reviews/${review.restaurantId || review.restaurant.id}`)
        },
        error => {
          dispatch({ type: updateReviewFail, error } )
          dispatch(alertActions.alertError(error))
        }
      )
    }
  }
}

const initialState = {
  reviewsLoading: false,
  reviews: []
}

const addRestaurantId = review => ({...review, restaurantId: review.restaurant && review.restaurant.id})

// reducer
export const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case fetchAllReviewsRequest:
      return {
        ...state,
        reviewsLoading: true
      }
    case fetchAllReviewsSuccess:
      return {
        ...state,
        reviewsLoading: false,
        reviews: [ ...action.Reviews.map(addRestaurantId) ]
      }
    case fetchAllReviewsFail:
      return initialState
    case createReviewSuccess:
      return {
        ...state,
        reviewsLoading: false,
        reviews: [...state.reviews, addRestaurantId(action.review)]
      }
    case createReviewFail:
      return state
    case updateReviewSuccess:
      const reviews = state.reviews.map(r => {
        if (r.id !== action.review.id) return r
        return {
          ...r,
          ...action.review
        }
      }).map(addRestaurantId)
      return {
        ...state,
        reviewsLoading: false,
        reviews
      }
    case updateReviewFail:
        return state
    default: 
      return state
  }
}