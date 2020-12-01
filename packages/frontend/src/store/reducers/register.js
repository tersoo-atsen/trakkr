import { authConstants } from '../constants';

const initialState = {
  registering: false,
  error: [],
};

function registerReducer(state = initialState, action) {
  switch (action.type) {
    case authConstants.REGISTER_REQUEST:
      return {
        ...state,
        registering: action.registering,
      };
    case authConstants.REGISTER_SUCCESS: {
      return {
        ...state,
        registering: false,
      };
    }
    case authConstants.REGISTER_FAILURE: {
      return {
        ...state,
        registering: false,
        error: action.error,
      };
    }
    default:
      return state;
  }
}

export default registerReducer;
