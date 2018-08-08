import React from 'react';
import { connect } from 'react-redux';
import { renderIf } from '../lib/utils.js';
import * as actions from '../store/actions/auth';


class Auth extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let okToRender =
      this.props.auth.id &&
      (this.props.capability ? this.props.auth.capabilities.includes(this.props.capability) : true);
    let content = this.props.children;
    return <React.Fragment>{renderIf(okToRender, content)}</React.Fragment>;
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToprops = (dispatch, getState) => ({
  switch: payload => dispatch(actions.switchUser(payload)),
});

export default connect(mapStateToProps, mapDispatchToprops)(Auth);
