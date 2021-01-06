import { authConstants } from '../constants';

const initialState = {
  loggedIn: false,
  loggingIn: false,
  currentUser: {},
  error: [],
};

const globalReducer = (state = initialState, action) => {
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
        currentUser: action.currentUser,
        loggingIn: false,
      };
    }
    case authConstants.LOGIN_FAILURE: {
      return {
        ...state,
        loggingIn: false,
        error: action.error,
      };
    }
    case authConstants.LOGOUT: {
      return {
        ...state,
        currentUser: {},
        loggedIn: false,
      };
    }
    default:
      return state;
  }
};

export default globalReducer;
