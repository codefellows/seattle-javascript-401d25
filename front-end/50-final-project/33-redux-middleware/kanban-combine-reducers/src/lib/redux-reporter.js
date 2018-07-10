export default store => next => (action) => {
  try {
    console.log('__ACTION__', action);
    const result = next(action); // vinicio - this line updates the store
    console.log('__STATE__', store.getState());
    return result;
  } catch (error) {
    console.log('__ERROR__', error);
    action.error = error;
    return action;
  }
};
