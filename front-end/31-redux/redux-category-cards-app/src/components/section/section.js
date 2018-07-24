import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SectionForm from '../section-form/section-form';
import { create} from '../../action/section';
import * as sectionActions from '../../action/section';
// The import * basically means sectionActions looks like this:
// sectionActions = {
//   create: function
//   update:
//   remove:
// }

// The props that are passed into this Section component are DIFFERENT from the normal React way we've been passing in props. These props will actually be given to us by the Redux store

class Section extends React.Component {
  render() {
    const {
      section, 
      key,
      sectionRemove,
      sectionUpdate,
    } = this.props;
    return (
      <div className="section" key={key}>
        <h1> { section.title } </h1>
        <button onClick={() => sectionRemove(section)}> Delete </button>
        <SectionForm section={section} onComplete={sectionUpdate}/>
      </div>
    );
  }
}

Section.propTypes = {
  section: PropTypes.object,
  key: PropTypes.number,
  sectionRemove: PropTypes.func,
  sectionUpdate: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => {
  // We are creating props from inside this component and these props are essentially internal
  return {
    sectionRemove: data => dispatch(sectionActions.remove(data)), 
    // dispatch({ type: "SECTION_REMOVE": payload: {something}})
    sectionUpdate: data => dispatch(sectionActions.update(data)),
  };
};

// Redux's connect method takes in a first argument that we're not utilizing yet so it's null
// The second arg is the mapDispatchToProps function we defined above
// connect RETURNS a new function that expects a React component
// and this is how we hook up this component to the Redux store
export default connect(null, mapDispatchToProps)(Section);
