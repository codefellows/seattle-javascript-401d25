import { combineReducers } from 'redux';
import token from './token';
import profile from './profile';
import files from './file';

export default combineReducers({
  token,
  profile,
  files,
});
