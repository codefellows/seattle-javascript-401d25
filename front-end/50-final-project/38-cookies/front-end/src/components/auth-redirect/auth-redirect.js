import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as routes from '../../routes';
import {ROOT_ROUTE} from "../../routes";


/* HOW TO DESIGN A NEW COMPONENT?
  1 - Do I need to connect to the store?
          - This component needs access to the token.
  2 - Do I need props?
          - Yes. We need the location
  3 - Do I need any member functions (aka. methods) or lifecycle hooks?
          - Nothing besides render
  4 - What do I need to render?
* */
class AuthRedirect extends React.Component {
  render() {
    const { location, token } = this.props;
    const { pathname } = location;

    let destinationRoute = null;

    if (pathname === routes.LOGIN_ROUTE || pathname === routes.SIGNUP_ROUTE ||
    pathname === routes.ROOT_ROUTE) {
      if (token) {
        destinationRoute = routes.DASHBOARD_ROUTE;
      }
      // Vinicio - if the user is logged in, we'll redirect him/her to the dashboard
    } else if (!token) { // Vinicio - This if basically happens with EVERY OTHER ROUTE
      destinationRoute = routes.ROOT_ROUTE;
    }
    // Vinicio - 3 cases: DASHBOARD or ROOT or null
    return (
      <div>
        { destinationRoute ? <Redirect to= { destinationRoute }/> : undefined }
      </div>
    );
  }
}

AuthRedirect.propTypes = {
  token: PropTypes.string,
  location: PropTypes.object,
};

const mapStateToProps = state => ({
  token: state.token,
});

export default connect(mapStateToProps)(AuthRedirect);
