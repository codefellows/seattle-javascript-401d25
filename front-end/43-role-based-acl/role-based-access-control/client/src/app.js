import React from 'react';
import { connect } from 'react-redux';

import Auth from './components/auth.js';

import * as actions from './store/actions/auth.js';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <React.Fragment>
        <nav>
          Switch User Role:
          <button onClick={() => this.props.switch('')}>Not Logged In</button>
          <button onClick={() => this.props.switch('user')}>User</button>
          <button onClick={() => this.props.switch('editor')}>Editor</button>
          <button onClick={() => this.props.switch('admin')}>Admin</button>
        </nav>
        Capabilities: {JSON.stringify(this.props.auth.capabilities)}
        <hr />
        <Auth>
          <div>This should only show if you are a logged in user</div>
        </Auth>
        <Auth capability="update">
          <div>This should only show if you have update rights</div>
        </Auth>
        <Auth capability="delete">
          <div>This should only show if you have delete rights</div>
        </Auth>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToprops = (dispatch, getState) => ({
  switch: payload => dispatch(actions.switchUser(payload)),
});

export default connect(mapStateToProps, mapDispatchToprops)(App);
