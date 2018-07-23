import React from 'react';
import uuid from 'uuid/v4';
import ExpenseForm from '../expense-form/expense-form';
import ExpenseItem from '../expense-item/expense-item';
import { renderIf } from '../../lib/utils';
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

  handleRemoveExpense = (expenseToRemove) => {
    // this.setState is an async operation. That means any logic you place at the same level as this.setState is not guaranteed to happen in block level order. If you need a certain order of operations to occur, best to put that logic within this.setState's callback function
    this.setState((previousState) => {
      return {
        expenses: previousState.expenses.filter(expense => expense._id !== expenseToRemove._id),
      };
    });
  }

  handleUpdateExpense = (expenseToUpdate) => {
    return this.setState((previousState) => {
      return {
        expenses: previousState.expenses.map(expense => (expense._id === expenseToUpdate._id ? expenseToUpdate : expense)),
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
                <ExpenseItem 
                  expense={expense}
                  handleRemoveExpense={this.handleRemoveExpense}
                  handleUpdateExpense={this.handleUpdateExpense}
                />
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
        <ExpenseForm handleComplete={ this.handleAddExpense } />
        { 
          renderIf(this.state.error, <h2 className="error">You must enter a title.</h2>)
        }
        { this.handleExpensesList() }
        <p>Your total costs are: ${ this.handleTotalPrice() }</p>
      </section>
    );
  }
}
