import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import * as Users from './Users'
import * as Alerts from './Alerts'
import * as Restaurants from './Restaurants'
import * as Reviews from './Reviews'
import { UserType } from '../helpers/userTypes'

export default function configureStore (history, initialState) {
  const reducers = {
    users: Users.userReducer,
    alert: Alerts.alertReducer,
    restaurants: Restaurants.restaurantsReducer,
    reviews: Reviews.reviewsReducer
  }

  const middleware = [
    thunk,
    routerMiddleware(history)
  ]

  // In development, use the browser's Redux dev tools extension if installed
  const enhancers = []
  const isDevelopment = process.env.NODE_ENV === 'development'
  if (isDevelopment && typeof window !== 'undefined' && window.devToolsExtension) {
    enhancers.push(window.devToolsExtension())
  }

  const rootReducer = combineReducers({
    ...reducers,
    routing: routerReducer
  })

  const store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware), ...enhancers)
  )

  const user = JSON.parse(localStorage.getItem('user'))
  if (user) { 
    store.dispatch(Users.userActions.authorizeUser(user))
    store.dispatch(Restaurants.restaurantActions.fetchAllRestaurants())
    store.dispatch(Reviews.reviewActions.fetchAllReviews())
    if (user.type === UserType.Admin) store.dispatch(Users.userActions.fetchAllUsers())
  }
  return store
}
