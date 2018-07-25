export default store => next => (action) => {
  const result = next(action); // we must invoke next to make sure the chain completes

  const reduxStore = store.getState();

  // we save properties of our redux store to localstorage
  for (const key in reduxStore) { // eslint-disable-line
    if (!localStorage[key]) {
      localStorage[key] = JSON.stringify(reduxStore[key]);
    }
  }
  return result;
};
