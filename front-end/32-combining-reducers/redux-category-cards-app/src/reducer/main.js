import { combineReducers } from 'redux';
import sections from './section';
import cards from './card';

// this combineReducers method defines the shape of our store
export default combineReducers({
  sections,
  cards,
});
