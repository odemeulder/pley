import { UserApi } from '../api/UserApi'
import { alertActions } from './Alerts'
import history from '../helpers/history'

const authorizeUserRequest = 'USER_AUTH_REQUEST'
const authorizeUserSuccess = 'USER_AUTH_SUCCESS'
const authorizeUserFail = 'USER_AUTH_FAIL'
const registerUserRequest = 'REGISTER_REQUEST'
const registerUserSuccess = 'REGISTER_SUCCESS'
const registerUserFail = 'REGISTER_FAIL'
let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

export const actionCreators = {
  login(email, password) {
    return dispatch => {
      console.log('actionCreator')
      const user = { email, password }
      dispatch({ type: authorizeUserRequest, user })
      dispatch(alertActions.clearAlerts())
      UserApi.login(email, password).then(
        user => {
          dispatch({ type: authorizeUserSuccess, user })
          console.log("Successfull login")
          history.push('/')      
        },
        error => {
          dispatch({ type: authorizeUserFail, error })
          dispatch(alertActions.alertError(error))
          console.log("failed login")          
        }
      )
    }
  },
  register(user) {
    return dispatch => {
      dispatch({ type: registerUserRequest, user})
      dispatch(alertActions.clearAlerts())
      UserApi.register(user).then(
        user => {
          dispatch({ type: registerUserSuccess, user})
          dispatch({ type: authorizeUserSuccess, user })
        },
        error => {
          dispatch({ type: registerUserFail, error})
          dispatch(alertActions.alertError(error))
        }
      )
    }
  }
}

export const registrationReducer = (state = { registering: false }, action) => {
  switch(action.type) {
    case registerUserRequest:
      return {
        registering: true,
      }
    case registerUserSuccess:
    case registerUserFail: 
      return state
    default:
      return state
  }
}

export const authreducer = (state = initialState, action) => {
  switch(action.type) {
    case authorizeUserRequest:
      return {
        loggedIn: true,
        user: action.user
      }
    case authorizeUserSuccess:
      return {
        loggedIn: true,
        user: action.user
      }
    case authorizeUserFail: 
      return {
        user: {}
      }
    default:
      return state
  }
}