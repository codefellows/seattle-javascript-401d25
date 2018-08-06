import superagent from 'superagent';
import * as routes from '../lib/routes';


// sync action creators
const createSound = sound => ({
  type: 'SOUND_CREATE',
  payload: sound,
});

// async action creators
export default fileDescriptor => (store) => {
  const { token } = store.getState();

  // 'description' and 'picture' are properties automaticall given to us by the FileReader API
  return superagent.post(`${API_URL}${routes.SOUND_ROUTE}`)
    .set('Authorization', `Bearer ${token}`)
    .field('title', fileDescriptor.title)
    .attach('sound', fileDescriptor.sound)
    .then((response) => {
      return store.dispatch(createSound(response.body));
    });
};
