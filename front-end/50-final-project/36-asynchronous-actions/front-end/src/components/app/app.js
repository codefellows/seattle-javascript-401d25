import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Dashboard from '../dashboard/dashboard';

export default class App extends React.Component {
  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <div>
            <Route exact path="/" component={Dashboard} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
