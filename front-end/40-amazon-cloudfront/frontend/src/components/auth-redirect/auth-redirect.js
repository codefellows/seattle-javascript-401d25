// We are using this component to redirect any miscellaneous pathnames (i.e. "/foobar") to redirect itself to an appropriate component view instead of going to a blank page (which is the default action if we do not account for it)

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import * as routes from '../../lib/routes';

const mapStateToProps = state => ({
  token: state.token,
});

class AuthRedirect extends React.Component {
  renderFinalDestination = (pathname, token) => {
    const isRegisteredRoute = pathname === routes.LOGIN_ROUTE || pathname === routes.SIGNUP_ROUTE || pathname === routes.ROOT_ROUTE;

    if (isRegisteredRoute) {
      if (token) {
        return <Redirect to={routes.DASHBOARD_ROUTE} />;
      }
      return null;
    } 

    if (!token) {
      return <Redirect to={routes.ROOT_ROUTE} />;
    }
    return null;
  }

  render() {
    // location comes from props directly, token comes from the Redux store
    const { location, token } = this.props;
    const { pathname } = location;
    return (
      <div className="auth-redirect">
        { this.renderFinalDestination(pathname, token) }
      </div>
    );
  }
}

AuthRedirect.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object,
  token: PropTypes.string,
};

export default connect(mapStateToProps)(AuthRedirect);
