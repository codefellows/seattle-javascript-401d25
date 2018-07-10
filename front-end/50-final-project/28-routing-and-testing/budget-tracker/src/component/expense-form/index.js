import React from 'react';
import autoBind from './../../utils';

export default class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      price: 0,
    };

    autoBind.call(this, ExpenseForm);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleAddExpense(this.state);
  }

  handleChange(event) {
    const { name, value } = event.target;
    // this brakcet notation denotes a computed value or a dynamic property name
    this.setState({
      [name]: value,
    });
  }

  render() {
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
        <button type="submit">Create Expense</button>
      </form>
    );
  }
}
