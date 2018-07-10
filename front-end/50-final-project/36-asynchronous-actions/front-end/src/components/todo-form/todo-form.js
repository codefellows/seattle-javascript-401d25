import React from 'react';
import PropTypes from 'prop-types';
import autoBind from './../../utils';

const defaultState = { title: '', error: null };

export default class TodoForm extends React.Component {
  constructor(props) {
    super(props);
    // TODO: if stuff is broke, check here
    this.state = props.todo ? props.todo : defaultState;
    // Function 
    autoBind.call(this, TodoForm);
  }

  componentDidUpdate(previousProps) {
    if (previousProps.todo !== this.props.todo) {
      this.setState(this.props.todo);
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const { onComplete } = this.props;
    const result = onComplete(this.state);
    if (result instanceof Promise) {
      result
        .then(() => {
          this.setState(defaultState);
        })
        .catch((error) => {
          console.error('TODO FORM ERROR: ', error);
          this.setState({ error });
        });
    }
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({ title: event.target.value });
  }

  render() {
    return (
      <form 
        onSubmit={this.handleSubmit}
        className="todo-form"
      >
        <input 
          name="title"
          type="text"
          placeholder="Enter a todo title"
          value={this.state.title}
          onChange={this.handleChange}
        />
        <button type="submit">{this.props.buttonText}</button>
      </form>
    );
  }
}

TodoForm.propTypes = {
  onComplete: PropTypes.func,
  todo: PropTypes.object,
  buttonText: PropTypes.string,
};

