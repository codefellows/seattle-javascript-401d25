import React from 'react';
import PropTypes from 'prop-types';
import autoBind from '../../utils';

const emptyState = {
  bio: '',
};

class ProfileForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.profile ? props.profile : emptyState;
    autoBind.call(this, ProfileForm);
  }
  //---------------------------------------------------------------
  // Member Functions
  //---------------------------------------------------------------
  handleChange(e) {
    const { value } = e.target;
    this.setState({
      bio: value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onComplete(this.state);
  }
  //---------------------------------------------------------------
  // Hooks
  //---------------------------------------------------------------
  render() {
    return (
      <form
        className='profile-form'
        onSubmit={this.handleSubmit}>

        <textarea
          name='bio'
          value={this.state.bio}
          onChange={this.handleChange}
        />

        <button type='submit'> {this.props.profile ? 'update' : 'create'} profile </button>
      </form>
    );
  }
}

ProfileForm.propTypes = {
  onComplete: PropTypes.func,
  profile: PropTypes.object,
};

//---------------------------------------------------------------
export default ProfileForm;
