import React from 'react';
import { render as reactDomRender } from 'react-dom';
import App from '../src/component/app';

const container = document.createElement('div');
document.body.appendChild(container);
reactDomRender(<App />, container);
