import React from 'react';
import PropTypes from 'prop-types';
import autoBind from '../../utils/';

// Vinicio - this is UI state. Everything (but the store) is UI state from now own.
const defaultState = {
  title: '',
};

// SectionForm.getDerivedStateFromProps()


class SectionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.section || defaultState;
    autoBind.call(this, SectionForm);
  }
  //-----------------------------------------------------
  // MEMBER FUNCTIONS
  //-----------------------------------------------------
  handleChange(event) {
    const { value } = event.target;
    this.setState({ title: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onComplete(this.state);
    this.setState(defaultState);
  }
  //-----------------------------------------------------
  // LIFE CYCLE HOOKS
  //-----------------------------------------------------

  // this replaces a lifecycle hook called "ComponentWillReceiveProps"
  // static methods are not attached to the instance of the class, they are attached to the original class itself
   // Static method calls are made directly on the class and are not callable on instances of the class. Static methods are often used to create utility functions.
  // getDerivedStateFromProps fires on ever render of the component
  //  getDerivedStateFromProps fires right before calling render method on initial mount and subsequent updates
  static getDerivedStateFromProps(nextProps) {
    if (nextProps.section) {
      // it's like this.setState is happening
      return nextProps.section;
    }
    return defaultState;
  }
  render() {
    const buttonText = this.props.section ? 'Update' : 'Create';
    return (
      <form
        onSubmit={this.handleSubmit}
        className='section-form'>

        <input
          type='text'
          name='title'
          placeholder='Title'
          value={this.state.title}
          onChange={this.handleChange}
        />
        <button type='submit'>{buttonText} Section</button>

      </form>
    );
  }
}

SectionForm.propTypes = {
  onComplete: PropTypes.func,
  section: PropTypes.object, // Vinicio - used to update sections
};

// Vinicio - you could bind your form to state in here

export default SectionForm;
