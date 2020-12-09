import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Tooltip from '@material-ui/core/Tooltip';

import './FormDialog.styles.scss';

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

const FormDialog = ({
  targetId,
  textFieldLabel,
  buttonLabel,
  onSubmitHandler,
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

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
        <TextField
          //name="taskDescription"
          label={textFieldLabel}
          fullWidth
          //value={formValues.taskDescription}
          //onChange={handleFieldChange}
          inputProps={{ autoFocus: true }}
        />
        <Button onClick={onSubmitHandler} color="primary" variant="contained">
          {buttonLabel}
        </Button>
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
