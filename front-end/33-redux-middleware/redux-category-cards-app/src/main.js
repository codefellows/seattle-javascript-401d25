import React from 'react';
import { createStore, applyMiddleware } from 'redux';

// Lines 5 and 6 accomplish the same thing
// import ReactDom from 'react-dom';
import { render as renderDom } from 'react-dom';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import App from './components/app/app';
// import sectionsReducer from './reducer/section';
import reducer from './reducer/main';
import './style/main.scss';

// bringing in our middleware
import reporter from './lib/middleware/redux-reporter';
import session from './lib/middleware/redux-session';

// Setting up the Redux store here
// this if function composition
const store = createStore(reducer, composeWithDevTools(applyMiddleware(reporter, session)));

const root = document.createElement('div');
document.body.appendChild(root);

renderDom(<Provider store={store}><App /></Provider>, root);
