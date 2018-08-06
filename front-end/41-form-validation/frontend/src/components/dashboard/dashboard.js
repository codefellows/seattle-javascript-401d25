import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SoundForm from '../sound-form/sound-form';
// I am not doing  import * syntax because I am only exporting one function from the sound action module
import createSoundApiRequest from '../../actions/soundfile';

const mapDispatchToProps = dispatch => ({
  createSound: sound => dispatch(createSoundApiRequest(sound)),
});

// For today, this will just be a simple component that we will use to determine that we got past authentication/authorization

class Dashboard extends React.Component {
  render() {
    const { createSound } = this.props;
    return (
      <div className="dashboard">
        <SoundForm onComplete={ createSound } />
      </div>
    );
  }
}

Dashboard.propTypes = {
  createSound: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(Dashboard);
