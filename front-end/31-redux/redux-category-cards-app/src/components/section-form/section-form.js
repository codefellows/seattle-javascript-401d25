import React from 'react';
import PropTypes from 'prop-types';

const defaultState = {
  title: '',
};

export default class SectionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.section || defaultState;
  }

  handleChange = (event) => {
    const { value } = event.target;
    this.setState({ title: value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onComplete(this.state);
  }

  render() {
    console.log(this.props, 'WHAT IS THIS')
    const buttonText = this.props.section ? 'Update' : 'Create';
    return (
      <form
        onSubmit={ this.handleSubmit }
        className="section-form"
      >
        <input 
          type="text"
          name="title"
          placeholder="title"
          value={this.state.value}
          onChange={this.handleChange}
        />
        <button type="submit">{buttonText}</button>
      </form>
    );
  }
}

SectionForm.propTypes = {
  onComplete: PropTypes.func,
  section: PropTypes.object,
};
