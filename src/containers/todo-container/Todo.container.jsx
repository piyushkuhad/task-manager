import React from 'react';
import { useSelector } from 'react-redux';

import TodoItem from '../../components/todo-item/TodoItem.component';
import './Todo.styles.scss';

const TodoContainer = () => {
  const [todoData, setTodoData] = React.useState([]);

  const { todosByMonthData, selectedDate, userTags } = useSelector(
    (state) => state.todos
  );

  const filterTodo = () => {
    const { selectedDay, selectedMonth, selectedYear } = selectedDate;

    if (
      Object.keys(todosByMonthData).length > 0 &&
      todosByMonthData[`${selectedMonth}-${selectedYear}`]
    ) {
      if (
        todosByMonthData[`${selectedMonth}-${selectedYear}`][
          `${selectedDay}`
        ] !== undefined
      ) {
        const todoObj =
          todosByMonthData[`${selectedMonth}-${selectedYear}`][
            `${selectedDay}`
          ];
        let todoArr = [];

        for (const todoItem in todoObj) {
          todoArr.push({ ...todoObj[todoItem], _id: todoItem });
        }

        setTodoData(todoArr);
      } else {
        setTodoData([]);
      }
    } else {
      setTodoData([]);
    }
  };

  const showUserTags = () => {
    if (Object.keys(userTags).length > 0) {
      return Object.keys(userTags).map((el) => (
        <li>
          <span
            className="cm-tag-bg"
            style={{ backgroundColor: userTags[el].colorCode }}
          ></span>
          <span className="cm-tag-title">{el}</span>
        </li>
      ));
    } else {
      return <li>No User tags created.</li>;
    }
  };

  React.useEffect(() => {
    filterTodo();
    // eslint-disable-next-line
  }, [selectedDate, todosByMonthData]);

  return (
    <div className="cm-todo-container cm-flex-type-2">
      <div className="cm-page-center cm-flex cm-flex-sb">
        <div className="cm-sidebar-wrapper">
          <ul className="cm-menu-ul cm-todo-tag-list">{showUserTags()}</ul>
        </div>
        <div className="cm-todo-list-wrapper">
          {todoData.length > 0 ? (
            todoData.map((el) => (
              <TodoItem key={el._id} data={el} userTagsData={userTags} />
            ))
          ) : (
            <h3>No Todos found, start by adding some!!</h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoContainer;
