import { userConstants } from '../constants';
import userService from '../../services';

export const updateUserInfo = (updateUserParams) => async (dispatch) => {
  const request = () => ({ type: userConstants.UPDATE_USER_REQUEST });
  const success = () => ({ type: userConstants.UPDATE_USER_SUCCESS });
  const failure = (error) => ({ type: userConstants.UPDATE_USER_FAILURE, error });

  dispatch(request());
  const result = await userService.updateUser(updateUserParams);
  if (!result.error) {
    dispatch(success());
  } else {
    const error = ['User update failed. Please try again.'];
    dispatch(failure(error));
  }
};

export const userDummy = {};
