import { ReviewsApi } from '../api/ReviewsApi'
import { alertActions } from './Alerts'

const fetchAllReviewsRequest = "FETCH_ALL_REVIEWS_REQUEST"
const fetchAllReviewsSuccess = "FETCH_ALL_REVIEWS_SUCCESS"
const fetchAllReviewsFail = "FETCH_ALL_REVIEWS_FAIL"
const createReviewSuccess = "CREATE_REVIEW_SUCCESS"
const createReviewFail = "CREATE_REVIEW_FAIL"

// action creators
export const reviewActions = {

  fetchAllReviews() {
    return dispatch => {
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
    return dispatch =>
    ReviewsApi.create(review).then(
      data => {
        dispatch({type: createReviewSuccess, review: data})
      },
      error => {
        dispatch({ type: createReviewFail, error } )
        dispatch(alertActions.alertError(error))
      }
    )
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
    default: 
      return state
  }
}