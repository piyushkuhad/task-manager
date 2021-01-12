import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';

import './TodoItem.styles.scss';
import { completedTask } from '../../redux/todo/todo.action';
import { useDispatch, useSelector } from 'react-redux';

const TodoItem = ({ data, deleteTodoHandler, userTagsData }) => {
  const dispatch = useDispatch();
  const { cardColor, cardTxtColor } = useSelector(
    (state) => state.todos.appScheme
  );
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [checkBoxState, setCheckBoxState] = React.useState(data.completed);
  const [userTag, setUserTag] = React.useState([]);

  const useStyles = makeStyles((theme) => ({
    checkBox: {
      '& svg': {
        fill: cardTxtColor,
      },
    },
  }));

  const classes = useStyles();

  const handleChange = (event) => {
    setCheckBoxState((prevState) => {
      dispatch(completedTask(data, !prevState));
      return !prevState;
    });
  };

  const deleteTodo = () => {
    deleteTodoHandler(data);
    setAnchorEl(null);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    if (!Array.isArray(data.taskTags)) return;
    if (data.taskTags.length > 0) {
      const todoTags = data.taskTags.map((el) => {
        const tagExists = userTagsData.find((elem) => elem.tagName === el);

        if (tagExists) {
          return tagExists;
        } else return { tagName: el, colorCode: '#f00', exists: false };
      });
      setUserTag(todoTags);
    }
  }, [data.taskTags, userTagsData]);

  return (
    <div
      className={`cm-todo-item-container box-shadow-1 ${
        checkBoxState && data.completed ? 'cm-todo-item-done' : ''
      }`}
      style={{ backgroundColor: cardColor, color: cardTxtColor }}
    >
      <div className="cm-todo-item-top cm-flex-type-1">
        <div className="cm-todo-header-left cm-flex-type-1">
          <div className="cm-todo-item-tags">
            <ul className="cm-menu-ul">
              {userTag.length > 0 ? (
                userTag.map((el) => (
                  <Tooltip title={el.tagName} key={el.tagName} arrow>
                    <li
                      className="cm-tag-bg"
                      style={{ backgroundColor: el.colorCode }}
                    >
                      {el.exists !== undefined ? '?' : null}
                    </li>
                  </Tooltip>
                ))
              ) : (
                <li className="simple-txt">No Tags</li>
              )}
            </ul>
          </div>
          <p className="cm-todo-item-priority">{data.taskPriority}</p>
        </div>
        <IconButton
          color="primary"
          aria-label="Todo Actions"
          aria-controls="todo-action"
          aria-haspopup="true"
          className="cm-todo-item-action"
          onClick={handleMenu}
        >
          <MoreHorizIcon />
        </IconButton>
        <Menu
          className="todo-item-action-menu"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={() => {}}>Edit</MenuItem>
          <MenuItem onClick={() => {}}>Copy</MenuItem>
          <MenuItem onClick={deleteTodo}>Delete</MenuItem>
        </Menu>
      </div>
      <div className="cm-todo-item-body cm-flex-type-1">
        <div className="cm-todo-item-content">
          <h3>{data.taskName}</h3>
          <p>{data.taskDescription}</p>
        </div>
        <FormControlLabel
          control={
            <Checkbox
              checked={checkBoxState}
              onChange={handleChange}
              name="done-checkbox"
              color="primary"
              className={classes.checkBox}
            />
          }
          label="Done ?"
        />
      </div>
    </div>
  );
};

export default TodoItem;
