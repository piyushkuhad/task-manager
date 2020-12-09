import React from 'react';
import { connect } from 'react-redux';
import isEqual from 'lodash/isEqual';

import TodoItem from '../../components/todo-item/TodoItem.component';
import './Todo.styles.scss';

class TodoContainer extends React.Component {
  constructor(props) {
    super(props);
    this.colorArr = [
      '#b2afa1',
      '#ffe880',
      '#d1e5f7',
      '#daf2d6',
      '#ffcece',
      '#d2ceff',
    ];

    this.state = {
      todoData: [],
    };
  }

  componentDidMount() {
    this.filterTodo();
  }

  filterTodo = () => {
    const { todosByMonthData, selectedDate } = this.props;

    if (Object.keys(todosByMonthData).length > 0) {
      if (
        todosByMonthData[
          `${selectedDate.selectedMonth}-${selectedDate.selectedYear}`
        ][`${selectedDate.selectedDay}`] !== undefined
      ) {
        const todoObj =
          todosByMonthData[
            `${selectedDate.selectedMonth}-${selectedDate.selectedYear}`
          ][`${selectedDate.selectedDay}`];
        let todoArr = [];

        for (const todoItem in todoObj) {
          todoArr.push({ ...todoObj[todoItem], _id: todoItem });
        }

        this.setState({
          todoData: todoArr,
        });
      } else {
        this.setState({
          todoData: [],
        });
      }
    }
  };

  componentDidUpdate(nextProps) {
    if (!isEqual(nextProps.selectedDate, this.props.selectedDate)) {
      this.filterTodo();
    }
  }

  render() {
    return (
      <div className="cm-todo-container cm-flex-type-2">
        <div className="cm-page-center cm-flex cm-flex-sb">
          <div className="cm-sidebar-wrapper">
            <ul className="cm-menu-ul cm-todo-tag-list">
              <li>
                <a href="/">
                  <span
                    className="cm-tag-bg"
                    style={{ backgroundColor: this.colorArr[0] }}
                  ></span>
                  <span className="cm-tag-title">Work</span>
                </a>
              </li>
              <li>
                <a href="/">
                  <span
                    className="cm-tag-bg"
                    style={{ backgroundColor: this.colorArr[1] }}
                  ></span>
                  <span className="cm-tag-title">Study</span>
                </a>
              </li>
              <li>
                <a href="/">
                  <span
                    className="cm-tag-bg"
                    style={{ backgroundColor: this.colorArr[2] }}
                  ></span>
                  <span className="cm-tag-title">Entertainment</span>
                </a>
              </li>
              <li>
                <a href="/">
                  <span
                    className="cm-tag-bg"
                    style={{ backgroundColor: this.colorArr[3] }}
                  ></span>
                  <span className="cm-tag-title">Family</span>
                </a>
              </li>
              <li>
                <a href="/">
                  <span
                    className="cm-tag-bg"
                    style={{ backgroundColor: this.colorArr[4] }}
                  ></span>
                  <span className="cm-tag-title">Budget</span>
                </a>
              </li>
            </ul>
          </div>
          <div className="cm-todo-list-wrapper">
            {this.state.todoData.length > 0 ? (
              this.state.todoData.map((el) => (
                <TodoItem key={el._id} data={el} />
              ))
            ) : (
              <h3>No Todos found, start by adding some!!</h3>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  todosByMonthData: state.todos.todosByMonthData,
  selectedDate: state.todos.selectedDate,
});

export default connect(mapStateToProps)(TodoContainer);
