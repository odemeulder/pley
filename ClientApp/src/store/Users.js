import { UserApi } from '../api/UserApi'
import { alertActions } from './Alerts'
import history from '../helpers/history'

const authorizeUserRequest = 'USER_AUTH_REQUEST'
const authorizeUserSuccess = 'USER_AUTH_SUCCESS'
const authorizeUserFail = 'USER_AUTH_FAIL'
const registerUserRequest = 'REGISTER_REQUEST'
const registerUserSuccess = 'REGISTER_SUCCESS'
const registerUserFail = 'REGISTER_FAIL'
const userUpdateSuccess = 'USER_UPDATE_SUCCES'
const fetchUsersSuccess = 'FETCH_USERS_SUCCESS'
const deleteUserSuccess = 'DELETE_USER_SUCCESS'

export const userActions = {
  authorizeUser: user => ({ type: authorizeUserSuccess, user }),
  login(email, password) {
    return dispatch => {
      const user = { email, password }
      dispatch({ type: authorizeUserRequest, user })
      dispatch(alertActions.clearAlerts())
      UserApi.login(email, password).then(
        user => {
          dispatch({ type: authorizeUserSuccess, user })
          history.push('/')      
        },
        error => {
          dispatch({ type: authorizeUserFail, error })
          dispatch(alertActions.alertError(error))
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
  },
  updateUser(user) {
    return dispatch => {
      dispatch(alertActions.clearAlerts())
      UserApi.updateUser(user).then(
        user => {
          dispatch({ type: userUpdateSuccess, user})
          history.push('/user-admin')
        },
        error => {
          dispatch(alertActions.alertError(error))
        }
      )
    }
  },
  deleteUser(id) {
    return dispatch => {
      dispatch(alertActions.clearAlerts())
      UserApi.deleteUser(id).then(
        () => {
          dispatch({ type: deleteUserSuccess, id})
        },
        error => {
          dispatch(alertActions.alertError(error))
        }
      )
    }
  },
  fetchAllUsers() {
    return dispatch => {
      dispatch(alertActions.clearAlerts())
      UserApi.getAll().then(
        users => {
          dispatch({ type: fetchUsersSuccess, users})
        },
        error => {
          dispatch(alertActions.alertError(error))
        }
      )
    }
  }
}

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user 
  ? { loggedIn: true, currentUser: user, users: [] } 
  : { loggedIn: false, currentUser: {}, users: [] };

export const userReducer = (state = initialState, action) => {
  switch(action.type) {
    case registerUserRequest:
      return {
        registering: true,
      }
    case registerUserSuccess:
    case registerUserFail: 
      return state
    case fetchUsersSuccess:
      return {
        ...state,
        users: action.users
      }
    case userUpdateSuccess:
      return {
        ...state,
        users: state.users.map(u => {
          return u.id === action.user.id ? { ...u, ...action.user} : u
        })
      }
    case deleteUserSuccess:
      return {
        ...state,
        users: state.users.filter(u => u.id !== action.id)
      }
    case authorizeUserRequest:
      return {
        loggedIn: true,
        currentUser: action.user
      }
    case authorizeUserSuccess:
      return {
        loggedIn: true,
        currentUser: action.user
      }
    case authorizeUserFail: 
      return {
        currentUser: {}
      }
    default:
      return state
  }
}