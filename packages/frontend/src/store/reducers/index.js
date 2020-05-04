import { combineReducers } from 'redux';

import item from './items';
import global from './global';
import user from './user';
import register from './register';

export default combineReducers({
  item,
  global,
  user,
  register,
});
