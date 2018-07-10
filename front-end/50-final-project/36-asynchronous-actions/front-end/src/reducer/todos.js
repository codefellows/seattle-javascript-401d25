import { validateTodo } from '../utils';

const emptyState = [];

export default (state = emptyState, { type, payload }) => {
  switch (type) {
    case 'TODOS_FETCH':
      return payload;
    case 'TODO_CREATE':
      validateTodo(payload);
      return [payload, ...state];
    case 'TODO_UPDATE':
      validateTodo(payload);
      return state.map(item => (item._id === payload._id ? payload : item));
    case 'TODO_DELETE':
      validateTodo(payload);
      return state.filter(item => item._id !== payload._id);
    default: 
      return state;
  }
}
