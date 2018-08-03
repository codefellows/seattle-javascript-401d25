export default store => next => (action) => {
  try {
    console.log('ACTION IN MIDDLEWARE: ', action);
    const result = next(action);
    // store.getState gets current state of our store
    console.log('CURRENT REDUX STORE STATE: ', store.getState());

    return result;
  } catch (err) {
    console.error(err);
    return next(action);
  }
};

// the code is equivalent to the following:
/*
  export default function(store) {
    return function(next) {
      return function(action) {
        // logic happens here
      }
    }
  }

*/

