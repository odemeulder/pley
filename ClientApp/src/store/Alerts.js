const clearAlerts = "CLEAR_ALERTS"
const raiseSuccessAlert = "RAISE_SUCCESS_ALERT"
const raiseErrorAlert = "RAISE_ERROR_ALERT"

export const alertActions = {
  alertSuccess(message) {
    return { type: raiseSuccessAlert, message: message }
  },
  alertError(error) {
    return { type: raiseErrorAlert, message: error }
  },
  clearAlerts() {
    return { type: clearAlerts }
  }
}

export const alertReducer = (state = {}, action) => {
  switch (action.type) {
    case raiseSuccessAlert:
      return {
        type: 'success',
        message: action.message
      }
    case raiseErrorAlert:
      return {
        type: 'error',
        message: action.message
      }
    case clearAlerts:
      return {}
    default:
      return state
  }
}