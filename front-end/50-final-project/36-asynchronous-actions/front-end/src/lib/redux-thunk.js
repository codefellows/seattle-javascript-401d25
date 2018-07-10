export default store => next => action => (
  // action = todoCreateRequest(todo)
  typeof action === 'function'
    // todoCreateRequest(todo)(store.dispatch)
    ? action(store.dispatch)
    : next(action)
);
