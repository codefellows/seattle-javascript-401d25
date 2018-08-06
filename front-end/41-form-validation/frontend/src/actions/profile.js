import superagent from 'superagent';
import * as routes from '../lib/routes';


// sync action creators

export const setProfile = profile => ({
  type: 'PROFILE_SET',
  payload: profile,
});

// async action creators
export const createProfileRequest = profile => (store) => {
  const { token } = store.getState(); // rememebr, our store's state this far is only a token property

  return superagent.post(`${API_URL}${routes.PROFILE_ROUTE}`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json') // TODO: is this needed?
    .send(profile)
    .then((response) => {
      return store.dispatch(setProfile(response.body));
    });
};

// this update should be written with a FULL UNDERSTANDING of how your backend works and if you even have an update profile route to begin with
export const updateProfileRequest = profile => (store) => {
  const { token } = store.getState();

  return superagent.put(`${API_URL}${routes.PROFILE_ROUTE}/${profile._id}`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .send(profile)
    .then((response) => {
      return store.dispatch(setProfile(response.body));
    });
};

// Based off how Lecture 18 code is architected, this will return an array of profiles if no params.id is passed in, otherwise it returns a profile based off the req.params.id
export const fetchProfileRequest = () => (store) => {
  const { token } = store.getState();

  // const fetchRequestUrl = profile ? `${API_URL}${routes.PROFILE_ROUTE}/${profile._id}` : `${API_URL}${routes.PROFILE_ROUTE}`;

  return superagent.get(`${API_URL}${routes.PROFILE_ROUTE}/me`)
    .set('Authorization', `Bearer ${token}`)
    .then((response) => {
      return store.dispatch(setProfile(response.body));
    });
};
