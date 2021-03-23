import { authConstants, userConstants } from '../constants';

const initialState = {
  loggedIn: false,
  loading: false,
  currentUser: {},
  error: [],
};

const globalReducer = (state = initialState, action) => {
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      return {
        ...state,
        loading: action.loading,
      };
    case authConstants.LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: action.loggedIn,
        currentUser: action.currentUser,
        loading: false,
        error: [],
      };
    case authConstants.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case authConstants.LOGOUT:
      return {
        ...state,
        currentUser: {},
        loggedIn: false,
        error: [],
      };
    case userConstants.UPDATE_USER_REQUEST:
      return {
        ...state,
      };
    case userConstants.UPDATE_USER_SUCCESS:
      return {
        ...state,
        currentUser: action.user,
        error: [],
      };
    case userConstants.UPDATE_USER_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

export default globalReducer;
