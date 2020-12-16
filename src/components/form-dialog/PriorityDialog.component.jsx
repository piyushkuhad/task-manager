import React from 'react';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Tooltip from '@material-ui/core/Tooltip';

import './FormDialog.styles.scss';
import { useDispatch } from 'react-redux';
import { addPriority } from '../../redux/todo/todo.action';

const PriorityDialog = ({
  targetId,
  textFieldLabel,
  shouldOpen,
  //buttonLabel,
  //onSubmitHandler,
  initialDialogValues,
}) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(shouldOpen);
  const [dialogFormValues, setDialogFormValues] = React.useState(
    initialDialogValues
  );

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? targetId : undefined;

  const onDialogFieldChange = (event) => {
    setDialogFormValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const onPrioritySubmitHandler = () => {
    console.log('onPrioritySubmitHandler', dialogFormValues);
    if (dialogFormValues.priorityName.length > 0) {
      dispatch(addPriority(dialogFormValues.priorityName));
    }

    setAnchorEl(null);
    setDialogFormValues(initialDialogValues);
  };

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
        <TextField
          name="priorityName"
          label="Add Task Priority"
          fullWidth
          value={dialogFormValues.priorityName}
          onChange={onDialogFieldChange}
          inputProps={{ autoFocus: true }}
        />
        <Button
          onClick={onPrioritySubmitHandler}
          color="primary"
          variant="contained"
        >
          Add
        </Button>
      </Popover>
    </div>
  );
};

PriorityDialog.defaultProps = {
  textFieldLabel: '',
  buttonLabel: 'Add',
  initialDialogValues: {
    priorityName: '',
    tagName: '',
    colorCode: '',
  },
};

export default PriorityDialog;
