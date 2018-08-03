import React from 'react';
import PropTypes from 'prop-types';

const emptyState = {
  bio: '',
  firstName: '',
  lastName: '',
};

export default class ProfileForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.profile || emptyState;
  }

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onComplete(this.state);
  }

  render() {
    const buttonText = this.props.profile ? 'Update' : 'Create';
    return (
      <form className="profile-form" onSubmit={ this.handleSubmit }>
        <label htmlFor="bio">Type your bio here</label>
        <textarea 
          name="bio"
          value={ this.state.bio }
          onChange={ this.handleChange }
        />
        <label htmlFor="firstName">Type your first name here</label>
        <input 
          name="firstName"
          value={ this.state.firstName }
          onChange={ this.handleChange }
        />
        <label htmlFor="lastName">Type your last name here</label>
        <input 
          name="lastName"
          value={ this.state.lastName }
          onChange={ this.handleChange }
        />
        <button type="submit">{ buttonText }</button>
      </form>
    );
  }
}

ProfileForm.propTypes = {
  onComplete: PropTypes.func,
  profile: PropTypes.object,
};
