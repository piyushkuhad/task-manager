import React from 'react';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Tooltip from '@material-ui/core/Tooltip';

import './FormDialog.styles.scss';

const FormDialog = ({
  targetId,
  textFieldLabel,
  shouldOpen,
  //buttonLabel,
  //onSubmitHandler,
  children,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(shouldOpen);

  console.log('shouldOpen', anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? targetId : undefined;

  return (
    <div className="cm-form-dialog-container">
      <Tooltip title={textFieldLabel}>
        <IconButton
          color="primary"
          aria-label="Todo Actions"
          aria-controls="todo-action"
          aria-haspopup="true"
          onClick={handleClick}
          aria-describedby={id}
        >
          <AddCircleIcon />
        </IconButton>
      </Tooltip>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        className="cm-form-dialog-popover"
      >
        {children}
      </Popover>
    </div>
  );
};

FormDialog.defaultProps = {
  textFieldLabel: '',
  buttonLabel: 'Add',
  onSubmitHandler: () => {},
};

export default FormDialog;
