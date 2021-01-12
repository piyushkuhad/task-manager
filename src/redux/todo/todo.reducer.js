import {
  addTodoByDate,
  deleteTodo,
  mergeTodosByMonthData,
} from '../reducer.utils';
import { todoTypes } from './todo.types';
import { appTypes } from '../app/app.types';
import { cleanDate } from '../../utils/utilFn';

const INITIAL_STATE = {
  todos: {},
  todosByDate: {},
  todosRefByMonth: {},
  todosByMonthData: {},
  userTags: {},
  shouldFetchData: true,
  selectedDate: {
    selectedDay: cleanDate(new Date(), 'DD'),
    selectedMonth: cleanDate(new Date(), 'MM'),
    selectedYear: cleanDate(new Date(), 'YYYY'),
  },
  appNotification: {
    message: null,
    severity: 'info',
  },
  appScheme: {
    darkMode: false,
    cardColor: '#fff9de',
    cardTxtColor: '#69665c',
    enableNotifications: false,
  },
};

const todoReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case todoTypes.CREATE_TODO:
      //console.log('This', addTodoByDate(state.todos, action.payload));
      return {
        ...state,
        todos: addTodoByDate(state.todos, action.payload),
        //todos: todoList,
      };

    case appTypes.INITIAL_DATA_FETCH:
      return {
        ...state,
        todosByDate: action.payload.todos,
        todosRefByMonth: action.payload.todoRefByMonth,
        todosByMonthData: action.payload.todoListByDateData,
        userTags: action.payload.userTags,
        shouldFetchData: false,
      };

    case todoTypes.CREATE_TODO_NEW_MONTH:
      //console.log('Payload: ', action.payload);
      return {
        ...state,
        todosRefByMonth: {
          ...state.todosRefByMonth,
          ...action.payload.todosMonthRef,
        },
        todosByMonthData: {
          ...state.todosByMonthData,
          ...action.payload.todosByMonthData,
        },
        selectedDate: action.payload.selectedDate,
      };

    case todoTypes.COMPLETED_TASK:
    case todoTypes.CREATE_TODO_WITHIN_DATE:
      //console.log('payload:', action.payload);

      const newObj = mergeTodosByMonthData(
        state.todosByMonthData,
        action.payload.todosByMonthData,
        action.payload.selectedDate
      );

      //console.log('Merge', newObj);

      return {
        ...state,
        todosByMonthData: newObj,
        selectedDate: action.payload.selectedDate,
      };

    case appTypes.SELECTED_DATE_CHANGE:
      return {
        ...state,
        selectedDate: action.payload,
      };

    case todoTypes.DELETE_TODO:
      const filteredTodo = deleteTodo(
        state.todosByMonthData,
        action.payload.todoToDelete,
        action.payload.selectedDate
      );

      //console.log('Delete todo', filteredTodo);

      return {
        ...state,
        todosByMonthData: filteredTodo,
        selectedDate: action.payload.selectedDate,
      };

    case appTypes.USER_LOGOUT:
      return INITIAL_STATE;

    case appTypes.SHOW_SNACKBAR:
      return {
        ...state,
        appNotification: { ...action.payload },
      };

    case appTypes.HIDE_SNACKBAR:
      return {
        ...state,
        appNotification: { message: null, severity: 'info' },
      };

    case appTypes.CHANGE_USER_SETTING:
      return {
        ...state,
        appScheme: {
          ...state.appScheme,
          ...action.payload,
        },
      };

    default:
      return state;
  }
};

export default todoReducer;
