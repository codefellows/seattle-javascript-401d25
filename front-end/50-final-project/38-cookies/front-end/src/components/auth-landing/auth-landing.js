import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as authActions from '../../actions/auth';

import autoBind from '../../utils';
import AuthForm from '../auth-form/auth-form';

import * as routes from '../../routes';

class AuthLanding extends React.Component {
  constructor(props) {
    super(props);
    autoBind.call(this, AuthLanding);
  }
  //-------------------------------------------------------
  // MEMBER FUNCTIONS (METHODS)
  //-------------------------------------------------------
  handleLogin(user) {
    return this.props.pDoLogin(user)
      .then(() => {
        this.props.history.push(routes.DASHBOARD_ROUTE);
      })
      .catch(console.error);
  }

  handleSignup(user) {
    return this.props.pDoSignup(user)
      .then(() => {
        this.props.history.push(routes.DASHBOARD_ROUTE);
      })
      .catch(console.error);
  }

  //-------------------------------------------------------
  // LIFE CYCLE HOOKS
  //-------------------------------------------------------
  render() {
    const rootJSX = <div>
      <h2> WELCOME TO OUR APP!! </h2>
      <Link to='/signup'> Sign up to our app</Link>
      <Link to='/login'> Login to our app</Link>
    </div>;

    const signUpJSX = <div>
      <h2> SIGN UP! </h2>
      <AuthForm onComplete= {this.handleSignup}/>
      <p> Already have an account? </p>
      <Link to='/login'> Login to our app</Link>
    </div>;

    const loginJSX = <div>
      <h2> LOGIN! </h2>
      <AuthForm type='login' onComplete={ this.handleLogin}/>
      <p> Do not  have an account? </p>
      <Link to='/signup'> Sign up to our app</Link>
    </div>;

    const { location } = this.props;

    return (
      <div className='landing'>
        {location.pathname === routes.ROOT_ROUTE ? rootJSX : undefined }
        {location.pathname === routes.SIGNUP_ROUTE ? signUpJSX : undefined }
        {location.pathname === routes.LOGIN_ROUTE ? loginJSX : undefined }
      </div>
    );
  }
}

AuthLanding.propTypes = {
  pDoLogin: PropTypes.func,
  pDoSignup: PropTypes.func,
  location: PropTypes.object,
  history: PropTypes.object,
};

const mapStateToProps = state => ({
  token: state.token,
});

// Vinicio - We need to log in and to sign up
const mapDispatchToProps = dispatch => ({
  pDoSignup: user => dispatch(authActions.signupRequest(user)),
  pDoLogin: user => dispatch(authActions.loginRequest(user)),
});


export default connect(mapStateToProps, mapDispatchToProps)(AuthLanding);

