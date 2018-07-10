import superagent from 'superagent';
import * as routes from '../routes';
import { deleteCookie } from '../utils/cookie';
import { TOKEN_COOKIE_KEY } from '../constants';

//----------------------------------------------
// SYNC
//----------------------------------------------
export const setToken = token => ({
  type: 'TOKEN_SET',
  payload: token,
});

export const removeToken = () => ({
  type: 'TOKEN_REMOVE',
});

export const logout = () => {
  // 1 - Remove Cookie
  //   - Remove Token from Local Storage
  // 2 - Remove Token from Store
  deleteCookie(TOKEN_COOKIE_KEY);
  return removeToken();
};

//----------------------------------------------
// ASYNC
//----------------------------------------------
export const signupRequest = user => (store) => {
  return superagent.post(`${API_URL}${routes.SIGNUP_ROUTE}`)
    .send(user)
    .withCredentials()
    .then((response) => {
      return store.dispatch(setToken(response.text));
    });
};

// Vinicio - request
export const loginRequest = user => (store) => {
  return superagent.get(`${API_URL}${routes.LOGIN_ROUTE}`)
    .auth(user.username, user.password)
    .withCredentials()
    .then((response) => {
      return store.dispatch(setToken(response.text));
    });
};
