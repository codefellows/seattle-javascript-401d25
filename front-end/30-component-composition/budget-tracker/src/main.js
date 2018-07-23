import React from 'react';
import { render as renderDom } from 'react-dom';
import App from './components/app/app';
import './style/main.scss';

const root = document.createElement('div');
document.body.appendChild(root);
renderDom(<App />, root);
