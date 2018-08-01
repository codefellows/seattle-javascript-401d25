import superagent from 'superagent';
import * as routes from '../lib/routes';

// sync action creators

export const setProfile = profile => ({
  type: 'PROFILE_SET',
  payload: profile,
});

// async action creator
export const createProfileRequest = profile => (store) => {
  const { token } = store.getState();

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

export const fetchProfileRequest = () => (store) => {
  const { token } = store.getState();

  return superagent.get(`${API_URL}${routes.PROFILE_ROUTE}/me`)
    .set('Authorization', `Bearer ${token}`)
    .then((response) => {
      return store.dispatch(setProfile(response.body));
    });
};
