import { authConstants } from '../constants';
import userService from '../../services';

const request = (loggingIn) => (
  { type: authConstants.LOGIN_REQUEST, loggingIn }
);
const success = (loggedIn, user) => (
  { type: authConstants.LOGIN_SUCCESS, loggedIn, user }
);
const failure = (error) => (
  { type: authConstants.LOGIN_FAIL, error }
);

const login = (loginActionParams) => async (dispatch) => {
  const {
    loginMutation, email, password, history,
  } = loginActionParams;

  dispatch(request(true));

  const result = await userService.login(loginMutation, email, password);
  let token = null;

  if (result) {
    const { user } = result;
    token = result.token;
    dispatch(success(true, user));
    history.push('/');
  } else {
    const error = ['Login failed. Please try again.'];
    dispatch(failure(error));
  }
  return token;
};

const logout = (dispatch, history) => {
  userService.logout();
  dispatch({ type: authConstants.LOGOUT });
  history.push('/');
};

const authActions = {
  login,
  logout,
};

export default authActions;
