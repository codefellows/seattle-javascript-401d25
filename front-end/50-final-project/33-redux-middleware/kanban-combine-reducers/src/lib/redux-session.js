export default store => next => (action) => {
  const result = next(action);// vinicio - making sure the chain completes
  const state = store.getState(); // vinicio - getting the final state

  for (const key in state) { //eslint-disable-line
    if (Object.prototype.hasOwnProperty.call(state, key)) {
      localStorage[key] = JSON.stringify(state[key]);
    }
  }
  return result;
};
