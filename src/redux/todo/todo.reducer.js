import { addTodoByDate } from '../reducer.utils';
import { todoTypes } from './todo.types';

const INITIAL_STATE = {
  todos: {},
};

const todoReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case todoTypes.CREATE_TODO:
      //console.log('This', addTodoByDate(state.todos, action.payload));
      return {
        ...state,
        todos: addTodoByDate(state.todos, action.payload),
      };
    default:
      return state;
  }
};

export default todoReducer;
