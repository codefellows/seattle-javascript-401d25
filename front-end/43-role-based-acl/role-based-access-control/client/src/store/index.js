import { createStore, combineReducers, applyMiddleware } from 'redux';

import reporter from './middleware/reporter.js';
import thunk from './middleware/thunk.js';
import authReducer from './reducers/auth.js';

let reducers = combineReducers({
  auth: authReducer,
});

export default () => createStore(reducers, applyMiddleware(thunk, reporter));

// , window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
