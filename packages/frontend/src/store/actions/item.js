import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { itemConstants } from '../constants';
import { itemService } from '../../services';

export const addItem = (addItemParams) => async (dispatch) => {
  const { history } = addItemParams;
  const request = () => ({ type: itemConstants.ADD_ITEM_REQUEST });
  const success = () => ({ type: itemConstants.ADD_ITEM_SUCCESS });
  const failure = (error) => ({ type: itemConstants.ADD_ITEM_FAILURE, error });
  const notifySuccess = () => toast('Item successfully created.');
  const notifyFailure = () => toast('Something went wrong, please try again.');
  dispatch(request());
  const item = await itemService.addItem(addItemParams);
  if (!item.error) {
    dispatch(success());
    history.push('/items');
    notifySuccess();
  } else {
    const error = ['Item creation failed. Please try again.'];
    dispatch(failure(error));
    notifyFailure();
  }
};

export const editItem = (editItemParams) => async (dispatch) => {
  const { history } = editItemParams;
  const request = () => ({ type: itemConstants.UPDATE_ITEM_REQUEST });
  const success = () => ({ type: itemConstants.UPDATE_ITEM_SUCCESS });
  const failure = (error) => ({ type: itemConstants.UPDATE_ITEM_FAILURE, error });
  const notifySuccess = () => toast('Item successfully updated.');
  const notifyFailure = () => toast('Something went wrong, please try again.');
  dispatch(request());
  const item = await itemService.editItem(editItemParams);
  if (!item.error) {
    dispatch(success());
    history.push('/items');
    notifySuccess();
  } else {
    const error = ['Item update failed. Please try again.'];
    dispatch(failure(error));
    notifyFailure();
  }
};

export const itemDummy = {};
