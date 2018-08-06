import React from 'react';
import { PropTypes } from 'prop-types';
import validator from 'validator';
import { renderIf, devLogger } from '../../lib/utils';

import './auth-form.scss';

const emptyState = {
  username: '',
  usernameDirty: false,
  usernameError: '',

  email: '',
  emailDirty: false,
  emailError: '',

  password: '',
  passwordDirty: false,
  passwordError: '',

  conflictError: false,
  conflictErrorMsg: 'Username or email already exists in the database',
};

const MIN_NAME_LENGTH = 6;
const MIN_PASSWORD_LENGTH = 6;

export default class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = emptyState;
  }

  handleValidation = (name, value) => {
    if (this.props.type === 'login') {
      return null;
    }

    // name can either be "username", "email", or "password"
    switch (name) {
      case 'username':
        if (value.length < MIN_NAME_LENGTH) {
          return `Your name must be at least ${MIN_NAME_LENGTH} characters long.`;
        }
        return null;
      case 'email':
        if (!validator.isEmail(value)) {
          return 'You must provide a valid email.';
        }
        return null;
      case 'password':
        if (value.length < MIN_PASSWORD_LENGTH) {
          return `Your password must be at least ${MIN_PASSWORD_LENGTH} characters long.`;
        }
        return null;
      default: 
        return null;
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ 
      [name]: value,
      [`${name}Dirty`]: true,
      [`${name}Error`]: this.handleValidation(name, value),
      conflictError: false,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { usernameError, passwordError, emailError } = this.state; 
    if (!this.props.type === 'login' || (!usernameError && !passwordError && !emailError)) {
      this.props.onComplete(this.state)
        .then(() => {
          this.setState(emptyState);
        })
        .catch((error) => {
          if (error.status === 409) {
            this.setState({ conflictError: true });
          }
        });
    }
  }

  renderEmailInput = (type) => {
    if (type === 'signup') {
      return (
        <div>
          { renderIf(this.state.emailDirty, <h4 className="error">{ this.state.emailError }</h4>)}
          <input 
            name="email"
            placeholder="email"
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </div>
      );
    }
    return undefined;
  }

  render() {
    let { type } = this.props;
    // if the "type" prop is already equal to login, keep it as "login", otherwise, if not, set it "signup"
    type = type === 'login' ? type : 'signup'; 
    return (
      <form className="auth-form" onSubmit={ this.handleSubmit }>
        {
          renderIf(this.state.usernameDirty, <h4 className="error">{ this.state.usernameError }</h4>)
        }
        <input 
          name="username"
          placeholder="username"
          type="text"
          value={ this.state.username }
          onChange={ this.handleChange }
        />

        { this.renderEmailInput(type) }

        {
          renderIf(this.state.passwordDirty, <h4 className="error">{ this.state.passwordError }</h4>)
        }
        <input 
          name="password"
          placeholder="password"
          type="password"
          value={ this.state.password }
          onChange={ this.handleChange }
        />
        {
          renderIf(this.state.conflictError, <h4 className="error">{ this.state.conflictErrorMsg }</h4>)
        }
        <button type="submit">{ type }</button>
      </form>
    );
  }
}

AuthForm.propTypes = {
  onComplete: PropTypes.func,
  type: PropTypes.string,
};
