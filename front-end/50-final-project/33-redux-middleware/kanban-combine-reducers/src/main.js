import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import App from './component/app/app';
import reducer from './reducer/main';
import session from './lib/redux-session';
import reporter from './lib/redux-reporter';

import './styles/main.scss';

//------------------------------------------------------------
// Setting up the Store
//------------------------------------------------------------
const store = createStore(reducer, composeWithDevTools(applyMiddleware(reporter, session)));
//------------------------------------------------------------
// Redering
//------------------------------------------------------------
const appContainer = document.createElement('div');
document.body.appendChild(appContainer);

ReactDom.render(<Provider store={store}><App/></Provider>, appContainer);
