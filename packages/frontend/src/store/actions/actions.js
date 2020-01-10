import { ADD_ITEM, UPDATE_ITEM } from '../constants/actionTypes';

export function addItem(payload) {
  return { type: ADD_ITEM, payload };
}

export function updateItem(payload) {
  return { type: UPDATE_ITEM, payload };
}
