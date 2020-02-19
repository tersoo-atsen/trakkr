import { combineReducers } from 'redux';

import item from './items';
import global from './global';
import user from './user';

export default combineReducers({ item, global, user });
