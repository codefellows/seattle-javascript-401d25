import React from 'react';
import uuid from 'uuid/v4';
import ExpenseForm from '../expense-form/expense-form';
import './dashboard.scss';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expenses: [],
      error: null,
    };
  }

  handleAddExpense = (expense) => {
    if (expense.title === '') {
      return this.setState({ error: true });
    }

    expense.createdOn = new Date();
    expense._id = uuid();
    return this.setState((previousState) => {
      return {
        expenses: [...previousState.expenses, expense], // this spread operator makes a copy of the array, then we add a new expense to the array, this is basically how "concat" works
        error: null,
      };
    });
  }

  handleTotalPrice = () => {
    return this.state.expenses.reduce((sum, expense) => {
      return sum + Number(expense.price); // we wrap expense.price in "Number" since it is a string in the number input field
    }, 0);
  }

  handleExpensesList = () => {
    return (
      <ul>
        {
          this.state.expenses.map((expense) => {
            return (
              <li key={expense._id}>
                {expense.title} : ${expense.price}
              </li>
            );
          })
        }
      </ul>
    );
  }

  render() {
    return (
      <section className="dashboard">
        <ExpenseForm handleAddExpense={ this.handleAddExpense } />
        { 
          this.state.error && <h2 className="error">You must enter a title.</h2>
        }
        { this.handleExpensesList() }
        <p>Your total costs are: ${ this.handleTotalPrice() }</p>
      </section>
    );
  }
}
