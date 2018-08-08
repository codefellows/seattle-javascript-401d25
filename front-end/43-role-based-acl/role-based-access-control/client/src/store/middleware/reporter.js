export default store => next => action => {
  console.log('__ACTION__', action);
  try {
    let result = next(action);
    console.log('__STATE__', store.getState());
    return result;
  } catch (err) {
    err.action = action;
    console.error(err);
    return err;
  }
};
