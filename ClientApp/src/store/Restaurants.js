import { RestaurantsApi } from '../api/RestaurantsApi'
import { alertActions } from './Alerts'

const fetchAllRestaurantsRequest = "FETCH_ALL_RESTAURANTS_REQUEST"
const fetchAllRestaurantsSuccess = "FETCH_ALL_RESTAURANTS_SUCCESS"
const fetchAllRestaurantsFail = "FETCH_ALL_RESTAURANTS_FAIL"

// action creators
export const restaurantActions = {

  fetchAllRestaurants() {
    return dispatch => {
      dispatch({ type: fetchAllRestaurantsRequest })
      RestaurantsApi.getAll().then(
        data => {
          dispatch({ type: fetchAllRestaurantsSuccess, restaurants: data })
        },
        error => {
          dispatch({ type: fetchAllRestaurantsFail, error } )
          dispatch(alertActions.alertError(error))
        }
      )
    }
  }
}

const initialState = {
  restaurantsLoading: false,
  restaurants: []
}

// reducer
export const restaurantsReducer = (state = initialState, action) => {
  switch (action.type) {
    case fetchAllRestaurantsRequest:
      return {
        ...state,
        restaurantsLoading: true
      }
    case fetchAllRestaurantsSuccess:
      return {
        ...state,
        restaurantsLoading: false,
        restaurants: [ ...action.restaurants, ...state.restaurants ]
      }
    case fetchAllRestaurantsFail:
      return initialState
    default: 
      return state
  }
}