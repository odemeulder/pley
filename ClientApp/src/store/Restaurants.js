import { RestaurantsApi } from '../api/RestaurantsApi'
import { alertActions } from './Alerts'
import history from '../helpers/history'

const fetchAllRestaurantsRequest = "FETCH_ALL_RESTAURANTS_REQUEST"
const fetchAllRestaurantsSuccess = "FETCH_ALL_RESTAURANTS_SUCCESS"
const fetchAllRestaurantsFail = "FETCH_ALL_RESTAURANTS_FAIL"

const createRestaurantSuccess = "CREATE_RESTAURANT_SUCCESS"
const updateRestaurantSuccess = "UPDATE_RESTAURANT_SUCCESS"

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
  },
  createRestaurant(restaurant) {
    return dispatch => {
      RestaurantsApi.create(restaurant).then(
        data => {
          dispatch({ type: createRestaurantSuccess, restaurant: data })
          history.push(`/restaurant-admin`)
        },
        error => {
          dispatch(alertActions.alertError(error))
        }
      )
    }
  },
  updateRestaurant(restaurant) {
    return dispatch => {
      RestaurantsApi.update(restaurant).then(
        data => {
          dispatch({ type: updateRestaurantSuccess, restaurant: data })
          history.push(`/restaurant-admin`)
        },
        error => {
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
        restaurants: [ ...action.restaurants ]
      }
    case fetchAllRestaurantsFail:
      return initialState
    case createRestaurantSuccess:
        return {
          ...state,
          restaurantsLoading: false,
          restaurants: [ ...state.restaurants, action.restaurant ]
        }
    case updateRestaurantSuccess:
      const restaurants = state.restaurants.map(r => {
        return r.id === action.restaurant.id 
          ? { ...r, ...action.restaurant }
          : r
      })
      return {
        ...state,
        restaurantsLoading: false,
        restaurants
      }
    default: 
      return state
  }
}