import { userConstants } from '../constants';
import userService from '../../services';

export const updateUserInfo = (updateUserParams) => async (dispatch) => {
  const request = () => ({ type: userConstants.UPDATE_USER_REQUEST });
  const success = (user) => ({ type: userConstants.UPDATE_USER_SUCCESS, user });
  const failure = (error) => ({ type: userConstants.UPDATE_USER_FAILURE, error });

  dispatch(request());
  const user = await userService.updateUser(updateUserParams);
  if (!user.error) {
    dispatch(success(user));
  } else {
    const error = ['User update failed. Please try again.'];
    dispatch(failure(error));
  }
};

export const userDummy = {};
