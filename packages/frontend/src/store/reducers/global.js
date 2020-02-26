import { authConstants } from '../constants';

const initialState = {
  loggedIn: false,
  loggingIn: false,
  user: {},
  error: [],
};

function globalReducer(state = initialState, action) {
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      return {
        ...state,
        loggingIn: action.loggingIn,
      };
    case authConstants.LOGIN_SUCCESS: {
      return {
        ...state,
        loggedIn: action.loggedIn,
        user: action.user,
        loggingIn: false,
      };
    }
    case authConstants.LOGIN_FAIL: {
      return {
        ...state,
        loggingIn: false,
        error: action.error,
      };
    }
    case authConstants.LOGOUT: {
      return {
        ...state,
        user: {},
        loggedIn: false,
      };
    }
    default:
      return state;
  }
}

export default globalReducer;
