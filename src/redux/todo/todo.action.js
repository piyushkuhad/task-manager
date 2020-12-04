import { todoTypes } from './todo.types';

export const createTodo = (data) => ({
  type: todoTypes.CREATE_TODO,
  payload: data,
});

export const getTodoList = () => ({
  type: todoTypes.GET_TODO_LIST,
});

export const getTodo = (id) => ({
  type: todoTypes.GET_TODO,
});

export const editTodo = (data) => ({
  type: todoTypes.EDIT_TODO,
  payload: data,
});

export const deleteTodo = (id) => ({
  type: todoTypes.DELETE_TODO,
});
