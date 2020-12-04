import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';

import './TodoItem.styles.scss';

const TodoItem = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [checkBoxState, setCheckBoxState] = React.useState(false);

  const handleChange = (event) => {
    setCheckBoxState((prevState) => !prevState);
  };

  const colorArr = [
    '#b2afa1',
    '#ffe880',
    '#d1e5f7',
    '#daf2d6',
    '#ffcece',
    '#d2ceff',
  ];

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div
      className={`cm-todo-item-container box-shadow-1 ${
        checkBoxState ? 'cm-todo-item-done' : null
      }`}
    >
      <div className="cm-todo-item-top cm-flex-type-1">
        <p className="cm-todo-item-priority">Urgent</p>
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
          <MenuItem onClick={() => {}}>Delete</MenuItem>
        </Menu>
      </div>
      <div className="cm-todo-item-header">
        <h3>Todo Title</h3>
      </div>
      <div className="cm-todo-item-body">
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s
        </p>
      </div>
      <div className="cm-todo-item-footer cm-flex-type-1">
        <div className="cm-todo-item-tags">
          <ul className="cm-menu-ul">
            <Tooltip title="Work" arrow>
              <li
                className="cm-tag-bg"
                style={{ backgroundColor: colorArr[0] }}
              />
            </Tooltip>
            <Tooltip title="Study" arrow>
              <li
                className="cm-tag-bg"
                style={{ backgroundColor: colorArr[1] }}
              />
            </Tooltip>
          </ul>
        </div>
        <FormControlLabel
          control={
            <Checkbox
              checked={checkBoxState}
              onChange={handleChange}
              name="done-checkbox"
              color="primary"
            />
          }
          label="Done ?"
        />
      </div>
    </div>
  );
};

export default TodoItem;
