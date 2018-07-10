import React from 'react';
import PropTypes from 'prop-types';
import autoBind from './../../utils';

const emptyState = {
  title: '',
  price: 0,
};

export default class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);
    // Vinicio - THis is UI STate
    this.state = this.props.expense ? this.props.expense : emptyState;

    autoBind.call(this, ExpenseForm);
  }
  //-------------------------------------------------------------------------
  // MEMBER FUNCTIONS (created entirely by the developer)
  //-------------------------------------------------------------------------
  handleSubmit(event) {
    event.preventDefault();
    // Vinicio - HEre I'm calling handleAddExpense ASSUMING it's a function
    this.props.handleComplete(this.state);
  }

  handleChange(event) {
    const { name, value } = event.target;
    // this brakcet notation denotes a computed value or a dynamic property name
    this.setState({
      [name]: value,
    });
  }
  //-------------------------------------------------------------------------
  // LIFECYCLE HOOKS
  //------------------------------------------------------------------------
  render() {
    const buttonText = this.props.expense ? 'Update' : 'Create';
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="title"
          value={this.state.title}
          onChange={this.handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="price"
          value={this.state.price}
          onChange={this.handleChange}
        />
        <button type="submit">{buttonText} Expense</button>
      </form>
    );
  }
}

ExpenseForm.propTypes = {
  expense: PropTypes.object,
  handleComplete: PropTypes.func,
};
