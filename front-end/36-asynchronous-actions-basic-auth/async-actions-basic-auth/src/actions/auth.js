import superagent from 'superagent';
import * as routes from '../lib/routes';

// These are sync action creators

export const setToken = token => ({
  type: 'TOKEN_SET',
  payload: token,
});

// we don't need a payload here because all we're doing is taking the token that is already set as a cookie in our browser and removing it
export const removeToken = () => ({
  type: 'TOKEN_REMOVE',
});

// These are async action creators

export const userSignup = user => (store) => {
  /*
    {
      username: 
      email: 
      password
    }

  */
  return superagent.post(`${API_URL}${routes.SIGNUP_ROUTE}`)
    .send(user)
    .withCredentials() // The .withCredentials() method enables the ability to send cookies from the origin
    .then((response) => {
      // return store.dispatch({ type: 'SET_TOKEN, payload: response.body.token })
      return store.dispatch(setToken(response.body.token));
    });
};

// userLogin(user)(store)
export const userLogin = user => (store) => {
  return superagent.get(`${API_URL}${routes.LOGIN_ROUTE}`)
    .auth(user.username, user.password)
    .withCredentials()
    .then((response) => {
      return store.dispatch(setToken(response.body.token));
    });
};
