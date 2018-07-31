import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as profileActions from '../../actions/profile';
import * as routes from '../../lib/routes';

import ProfileForm from '../profile-form/profile-form';

const mapStateToProps = store => ({
  profile: store.profile,
});

const mapDispatchToProps = dispatch => ({
  createProfile: profile => dispatch(profileActions.createProfileRequest(profile)),
  updateProfile: profile => dispatch(profileActions.updateProfileRequest(profile)), // we don't have this functionality in Lecture 18 backend
  fetchProfile: profile => dispatch(profileActions.fetchProfileRequest(profile)),
});

class Profile extends React.Component {
  constructor(props) {
    super(props);
    // this is UI state
    this.state = {
      editing: false,
      profile: props.profile || null,
    };
  }

  // lifecycle hook from React itself
  // TODO: resolve this flash of content
  componentDidMount() {
    // debugger;
    this.props.fetchProfile()
      .then((response) => {
        console.log(response, 'what is response');
      })
      .catch(console.error)
  }

  handleCreate = (profile) => {
    this.props.createProfile(profile)
      .then(() => {
        // The profile has been created, we inform/interact with the user
        // this.props.history.push(routes.DASHBOARD_ROUTE);
        this.props.history.push(routes.PROFILE_ROUTE);
      });
  }

  handleUpdate = (profile) => {
    // TODO: add validation, i.e. catch blocks
    this.props.updateProfile(profile);
    this.setState({ editing: false });
  }

  renderJSX = (profile) => {
    let JSXEditing = null;
    let JSXDisplay = null;
    let JSXProfile = null;
    if (profile) {
      JSXEditing = // eslint-disable-line
        <div>
          <ProfileForm profile={ profile } onComplete={ this.handleUpdate }/>
          <button onClick={() => this.setState({ editing: false })}>Cancel</button>
        </div>;

      JSXDisplay = // eslint-disable-line
      <div>
        <h2>This is my bio</h2>
        <p>{ profile.bio }</p>
        <button onClick={() => this.setState({ editing: true })}>Edit</button>
      </div>;

      JSXProfile = // eslint-disable-line
      <div>
        <h2>{ `${profile.firstName} ${profile.lastName}` }</h2>
        { this.state.editing ? JSXEditing : JSXDisplay }
      </div>;
      
      return JSXProfile;
    }
    return undefined;
  }

  render() {
    const { profile } = this.props;
    return (
      <div className="profile">
        <h1>Profile</h1>
        { profile ? this.renderJSX(profile) : <ProfileForm onComplete={ this.handleCreate }/>}
      </div>
    );
  }
}

Profile.propTypes = {
  profile: PropTypes.object,
  createProfile: PropTypes.func,
  updateProfile: PropTypes.func,
  fetchProfile: PropTypes.func,
  history: PropTypes.object,
};


export default connect(mapStateToProps, mapDispatchToProps)(Profile);
