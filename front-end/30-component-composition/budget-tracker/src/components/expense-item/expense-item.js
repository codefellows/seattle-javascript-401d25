import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../modal/modal';
import ExpenseForm from '../expense-form/expense-form';

export default class ExpenseItem extends React.Component {

  render() {
    const { expense, handleRemoveExpense, handleUpdateExpense } = this.props;
    // we use these helper functions in the render method because this is a dumb (stateless) component that solely relies on props. Any incoming changes to the props will recalculate in the render method. We could potentially make all these methods on the class, but when we would need to keep explicitly keep track of props using "this.props" inside those methods and invoke methods here instead of having access to our destructured methods at Line 9. We could potentially save those props in the component's own state, but that would unnecesary complexity. Either way would be fine. 
    const showModal = () => handleUpdateExpense({ ...expense, editing: true });
    const hideModal = () => handleUpdateExpense({ ...expense, editing: false });
    const updateAndClose = (updatedExpense) => {
      return handleUpdateExpense({ ...updatedExpense, editing: false });
    };
    return (
      <div className="expense-item" data-cy="expense-item">
        <strong>{expense.title}</strong> : ${expense.price}
        <button 
          onClick={() => handleRemoveExpense(expense) } data-cy="expense-item-btn">
          Delete
        </button>
        <button 
          onClick={showModal}
          data-cy="expense-item-btn">
          Update
        </button>
        <Modal 
          show={expense.editing}
          handleClose={hideModal}
        >
          <h3>Editing {expense.title}</h3>
          <ExpenseForm 
            handleComplete={updateAndClose}
            expense={expense}
          />
        </Modal>
      </div>
    )
  }
}