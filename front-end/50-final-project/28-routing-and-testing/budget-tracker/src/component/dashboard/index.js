import React from 'react';
import uuid from 'uuid/v4';
import ExpenseForm from './../expense-form/index';
import autoBind from '../../utils';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expenses: [],
      error: null,
    };

    autoBind.call(this, Dashboard);
  }

  handleAddExpense(expense) {
    if (expense.title === '') {
      return this.setState({ error: true });
    }

    expense.createdOn = new Date();
    expense.id = uuid();

    return this.setState((previousState) => {
      return {
        expenses: [...previousState.expenses, expense],
        error: null,
      };
    });
  }

  handleTotalPrice() {
    return this.state.expenses.reduce((sum, expense) => {
      return sum + Number(expense.price);
    }, 0);
  }

  handleExpensesList() {
    return (
      <ul>
        {
          this.state.expenses.map((expense) => {
            return (
              <li key={expense.id}>
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
        <h1>Budget Tracker Dashboard</h1>
        <ExpenseForm 
          handleAddExpense={this.handleAddExpense} 
        />
        { this.state.error && <h2 className="error">You must enter a title.</h2> }
        { this.handleExpensesList() }
        <p> Your total costs are: ${ this.handleTotalPrice() }</p>
      </section>
    );
  }
}
