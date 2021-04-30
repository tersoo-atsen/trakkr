import { itemConstants } from '../constants';
import { itemService } from '../../services';

export const addItem = (addItemParams) => async (dispatch) => {
  const request = () => ({ type: itemConstants.ADD_ITEM_REQUEST });
  const success = () => ({ type: itemConstants.ADD_ITEM_SUCCESS });
  const failure = (error) => ({ type: itemConstants.ADD_ITEM_FAILURE, error });

  dispatch(request());
  const item = await itemService.addItem(addItemParams);
  if (!item.error) {
    dispatch(success());
  } else {
    const error = ['Item creation failed. Please try again.'];
    dispatch(failure(error));
  }
};

export const itemDummy = {};
