// export default store => next => action => 
//   typeof action === 'function' ? action(store) : next(action);

export default store => next => (action) => {
  return typeof action === 'function' ? action(store) : next(action);
};
