import { authConstants } from '../constants';
import { userService } from '../../services';

export const login = (loginActionParams) => async (dispatch) => {
  const request = (loading) => ({ type: authConstants.LOGIN_REQUEST, loading });
  const success = (loggedIn, currentUser) => (
    { type: authConstants.LOGIN_SUCCESS, loggedIn, currentUser }
  );
  const failure = (error) => ({ type: authConstants.LOGIN_FAILURE, error });
  const {
    loginMutation,
    email,
    password,
    history,
  } = loginActionParams;
  dispatch(request(true));
  const result = await userService.login(loginMutation, email, password);
  let token = null;
  if (result) {
    const { user } = result;
    token = result.token;
    dispatch(success(true, user));
    history.push('/dashboard');
  } else {
    const error = ['Login failed. Please try again.'];
    dispatch(failure(error));
  }
  return token;
};

export const signup = (signupActionParams) => async (dispatch) => {
  const request = (registering) => ({ type: authConstants.REGISTER_REQUEST, registering });
  const success = (registering, user) => (
    { type: authConstants.REGISTER_SUCCESS, registering, user }
  );
  const failure = (error) => ({ type: authConstants.REGISTER_FAILURE, error });
  const {
    signupMutation, email, firstName, lastName, password, userName, history,
  } = signupActionParams;
  dispatch(request(true));
  const result = await userService
    .signup(signupMutation, email, firstName, lastName, password, userName);
  let token = null;
  if (result) {
    const { user } = result;
    token = result.token;
    dispatch(success(false, user));
    history.push('/');
  } else {
    const error = ['Registration failed. Please try again.'];
    dispatch(failure(error));
  }
  return token;
};

export const logout = (dispatch, history) => {
  userService.logout();
  dispatch({ type: authConstants.LOGOUT });
  history.push('/');
};
