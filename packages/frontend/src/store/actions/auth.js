import { authConstants } from '../constants';
import userService from '../../services';

const request = (loggingIn) => (
  { type: authConstants.LOGIN_REQUEST, loggingIn }
);
const success = (loggedIn) => (
  { type: authConstants.LOGIN_SUCCESS, loggedIn }
);
const failure = (error) => (
  { type: authConstants.LOGIN_FAIL, error }
);

const login = (loginActionParams) => async (dispatch) => {
  const {
    loginMutation, email, password, history,
  } = loginActionParams;

  dispatch(request(true));

  const token = await userService.login(loginMutation, email, password);
  if (token) {
    dispatch(success(true));
    history.push('/');
  } else {
    const error = ['Login failed. Please try again.'];
    dispatch(failure(error));
  }
  return token;
};

// const logout = () => {
// userService.logout();
// return { type: authConstants.LOGOUT };
// };

const authActions = {
  login,
  // logout,
};

export default authActions;
