import { combineReducers } from 'redux';
import sections from './section';
import cards from './card';

export default combineReducers({
  sections,
  cards,
});
