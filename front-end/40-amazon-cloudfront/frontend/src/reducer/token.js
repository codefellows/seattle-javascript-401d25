import { cookieFetch } from '../lib/utils';

const TOKEN_COOKIE_KEY = 'X-401d25-Token';
const token = cookieFetch(TOKEN_COOKIE_KEY);
// the setting of this state enables us to stay logged in if our cookie is in the browser
const initialState = token || null;

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'TOKEN_SET':
      return payload;
    case 'TOKEN_REMOVE':
      return null;
    default: 
      return state;
  }
};
