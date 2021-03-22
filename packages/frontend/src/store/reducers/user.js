import { userConstants } from '../constants';

const initialState = {
  error: [],
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case userConstants.UPDATE_USER_REQUEST:
      return {
        ...state,
      };
    case userConstants.UPDATE_USER_SUCCESS:
      return {
        ...state,
      };
    case userConstants.UPDATE_USER_FAILURE: {
      return {
        ...state,
        error: action.error,
      };
    }
    default:
      return state;
  }
}

export default userReducer;
