import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as sectionActions from '../../action/section';
import SectionForm from '../section-form/section-form';
import Section from '../section/section';

//--------------------------------------------------------------
class Landing extends React.Component {
  render() {
    // Vinicio - in the component, our state is linked AS PROPS
    const { sections, sectionCreate } = this.props;
    return (
      <div className='landing'>
        <SectionForm onComplete={sectionCreate}/>
        {/* Type sections.sections if you need to and check your Landing's props to see what "sections" looks like */}
        {
          sections.sections.map((currentSection, i) => <Section section={currentSection} key={i}/>)
        }
      </div>
    );
  }
}

Landing.propTypes = {
  sections: PropTypes.object,
  sectionCreate: PropTypes.func,
};
//--------------------------------------------------------------
const mapStateToProps = (state) => {
  // vinicio - the object we return WILL BECOME PROPS for landing
  return {
    sections: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sectionCreate: data => dispatch(sectionActions.create(data)),
  };
};

// Vinicio - this would be what happens behind the scenes
// const middleFunction = connect(mapStateToProp,mapDispatchToProps);
// export default middleFunction(Landing);
//--------------------------------------------------------------
export default connect(mapStateToProps, mapDispatchToProps)(Landing);
