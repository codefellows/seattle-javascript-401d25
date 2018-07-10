import React from 'react';
import PropTypes from 'prop-types';
import autoBind from './../../utils';

const emptyState = {
  username: '',
  email: '',
  password: '',
};

class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = emptyState;
    autoBind.call(this, AuthForm);
  }
  //---------------------------------------------------------------
  // Member Functions
  //---------------------------------------------------------------
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onComplete(this.state);
    this.setState(emptyState);
  }
  //---------------------------------------------------------------
  // Life-cycle Hooks
  //---------------------------------------------------------------

  render() {
    let { type } = this.props;

    type = type === 'login' ? type : 'signup';

    const signupJSX =
      <input
        name='email'
        placeholder='email'
        type='email'
        value={this.state.email}
        onChange={this.handleChange}
        />;

    const signupRenderedJSX = (type !== 'login') ? signupJSX : undefined;

    return (
      <form className='auth-form' onSubmit={this.handleSubmit} >

        <input
          name='username'
          placeholder='username'
          type='text'
          value={this.state.username}
          onChange={this.handleChange}
          />

        {signupRenderedJSX}

        <input
          name='password'
          placeholder='password'
          type='password'
          value={this.state.password}
          onChange={this.handleChange}
          />

        <button type='submit'> {type} </button>
      </form>
    );
  }
}

AuthForm.propTypes = {
  type: PropTypes.string,
  onComplete: PropTypes.func,
};

export default AuthForm;
