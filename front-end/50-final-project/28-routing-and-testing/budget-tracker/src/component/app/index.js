import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Dashboard from './../dashboard/index';
import '../../styles/main.scss';

export default class App extends React.Component {
  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <div>
            <header>
              <h1>Budget Tracker</h1>
              <nav>
                <ul>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/dashboard">Dashboard</Link></li>
                </ul>
              </nav>
            </header>
            <Route 
              exact
              path="/"
              component={() => <h1>I am your landing page!</h1>}
            />
            <Route 
              exact
              path="/dashboard"
              component={Dashboard}
            />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
