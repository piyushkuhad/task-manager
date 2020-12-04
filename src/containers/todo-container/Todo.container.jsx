import React from 'react';
import TodoItem from '../../components/todo-item/TodoItem.component';

import './Todo.styles.scss';

const TodoContainer = () => {
  const colorArr = [
    '#b2afa1',
    '#ffe880',
    '#d1e5f7',
    '#daf2d6',
    '#ffcece',
    '#d2ceff',
  ];

  console.log(colorArr.one);

  return (
    <div className="cm-todo-container cm-flex-type-2">
      <div className="cm-page-center cm-flex cm-flex-sb">
        <div className="cm-sidebar-wrapper">
          <ul className="cm-menu-ul cm-todo-tag-list">
            <li>
              <a href="/">
                <span
                  className="cm-tag-bg"
                  style={{ backgroundColor: colorArr[0] }}
                ></span>
                <span className="cm-tag-title">Work</span>
              </a>
            </li>
            <li>
              <a href="/">
                <span
                  className="cm-tag-bg"
                  style={{ backgroundColor: colorArr[1] }}
                ></span>
                <span className="cm-tag-title">Study</span>
              </a>
            </li>
            <li>
              <a href="/">
                <span
                  className="cm-tag-bg"
                  style={{ backgroundColor: colorArr[2] }}
                ></span>
                <span className="cm-tag-title">Entertainment</span>
              </a>
            </li>
            <li>
              <a href="/">
                <span
                  className="cm-tag-bg"
                  style={{ backgroundColor: colorArr[3] }}
                ></span>
                <span className="cm-tag-title">Family</span>
              </a>
            </li>
            <li>
              <a href="/">
                <span
                  className="cm-tag-bg"
                  style={{ backgroundColor: colorArr[4] }}
                ></span>
                <span className="cm-tag-title">Budget</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="cm-todo-list-wrapper">
          <TodoItem />
        </div>
      </div>
    </div>
  );
};

export default TodoContainer;
