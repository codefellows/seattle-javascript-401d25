import { combineReducers } from 'redux';
import token from './token';
import profile from './profile';
import soundfile from './soundfile';

export default combineReducers({
  token,
  profile,
  soundfile,
});
