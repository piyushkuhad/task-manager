import React from 'react';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Tooltip from '@material-ui/core/Tooltip';
import { TwitterPicker } from 'react-color';

import './FormDialog.styles.scss';
import { useDispatch } from 'react-redux';
import { addTag } from '../../redux/todo/todo.action';

const palette = [
  '#F44336',
  '#03A9F4',
  '#FEA47F',
  '#B33771',
  '#009688',
  '#4CAF50',
  '#CDDC39',
  '#FFC107',
  '#82589F',
  '#FD7272',
  '#FF5722',
  '#607D8B',
  '#BDC581',
  '#9AECDB',
];

const TagDialog = ({
  targetId,
  textFieldLabel,
  shouldOpen,
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

  const onTagSubmitHandler = () => {
    console.log('onTagSubmitHandler', dialogFormValues);
    if (
      dialogFormValues.tagName.length > 0 &&
      dialogFormValues.colorCode.length > 0
    ) {
      dispatch(addTag(dialogFormValues));
    }

    setAnchorEl(null);
    setDialogFormValues(initialDialogValues);
  };

  const handleColorChange = (color, event) => {
    console.log('Color', color);
    setDialogFormValues((prevState) => ({
      ...prevState,
      colorCode: color.hex,
    }));
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
        className="cm-form-dialog-popover cm-tag-dialog-popover"
      >
        <TextField
          name="tagName"
          label="Add Task Tag"
          fullWidth
          value={dialogFormValues.tagName}
          onChange={onDialogFieldChange}
          inputProps={{ autoFocus: true }}
        />
        <div className="cm-tag-color-picker">
          <p>Choose Color:</p>
          <TwitterPicker
            color={dialogFormValues.colorCode}
            colors={palette}
            onChange={handleColorChange}
          />
        </div>
        <Button
          onClick={onTagSubmitHandler}
          color="primary"
          variant="contained"
        >
          Add
        </Button>
      </Popover>
    </div>
  );
};

TagDialog.defaultProps = {
  textFieldLabel: '',
  buttonLabel: 'Add',
  initialDialogValues: {
    tagName: '',
    colorCode: '#8ed1fc',
  },
};

export default TagDialog;
