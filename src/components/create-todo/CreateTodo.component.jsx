import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import FormHelperText from '@material-ui/core/FormHelperText';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import SingleDatePicker from '../date-picker/SingleDatePicker.component';

import './CreateTodo.styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { createTodo } from '../../redux/todo/todo.action';
import PriorityDialog from '../form-dialog/PriorityDialog.component';
import TagDialog from '../form-dialog/TagDialog.component';

const useStyles = makeStyles((theme) => ({
  dialogActions: {
    justifyContent: 'flex-start',
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

//const priorities = ['Low', 'Medium', 'High', 'Urgent'];

//const tags = ['Work', 'Study', 'Entertainment', 'Family', 'Budget'];

const getStyles = (item, selectedItems, theme) => {
  return {
    fontWeight:
      selectedItems.indexOf(item) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightBold,
  };
};

const CreateTodo = ({ openDialogState, closeDialogHandler, initialValues }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [formValues, setFormValues] = React.useState(initialValues);

  const priorities = useSelector((state) =>
    state.firebase.profile.userPriorities
      ? state.firebase.profile.userPriorities
      : []
  );

  const tags = useSelector((state) =>
    state.firebase.profile.userTags
      ? state.firebase.profile.userTags.map((el) => el.tagName)
      : []
  );

  React.useEffect(() => {
    if (openDialogState) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [openDialogState]);

  const handleClose = () => {
    closeDialogHandler();
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const handleTaskPriorityChange = (event) => {
    setFormValues((prevState) => ({
      ...prevState,
      taskPriority: event.target.value,
    }));
  };

  const handleTaskTagsChange = (event) => {
    //setTaskTagsState(event.target.value);
    setFormValues((prevState) => ({
      ...prevState,
      taskTags: event.target.value,
    }));
  };

  const handleFieldChange = (event) => {
    setFormValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const getDateValue = (value) => {
    setFormValues((prevState) => ({
      ...prevState,
      taskTime: value,
    }));
  };

  const handleFormSubmit = () => {
    formValues.completed = false;
    console.log('Data', formValues);
    dispatch(createTodo(formValues));
    closeDialogHandler();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="md"
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create Todo Task</DialogTitle>
        <DialogContent>
          <form onSubmit={submitHandler} autoComplete="off">
            <div className="cm-form-field">
              <TextField
                name="taskName"
                label="Task Name"
                fullWidth
                value={formValues.taskName}
                //InputLabelProps={{ autoFocus: true }}
                inputProps={{ autoFocus: true }}
                onChange={handleFieldChange}
              />
            </div>
            <div className="cm-form-field">
              <TextField
                name="taskDescription"
                label="Task Description"
                fullWidth
                value={formValues.taskDescription}
                onChange={handleFieldChange}
              />
            </div>

            <div className="cm-form-field-half cm-flex-type-1">
              <div className="cm-form-field cm-field-with-btn cm-flex-type-1">
                <FormControl fullWidth>
                  <InputLabel>Task Priority</InputLabel>
                  <Select
                    //value={taskPriorityState}
                    value={formValues.taskPriority}
                    onChange={handleTaskPriorityChange}
                    input={<Input />}
                    renderValue={(selected) => (
                      <div className={classes.chips}>
                        <Chip label={selected} className={classes.chip} />
                      </div>
                    )}
                    MenuProps={MenuProps}
                  >
                    {priorities.map((priority) => (
                      <MenuItem
                        key={priority}
                        value={priority}
                        //style={getStyles(priority, taskPriorityState, theme)}
                        style={getStyles(
                          priority,
                          formValues.taskPriority,
                          theme
                        )}
                      >
                        {priority}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <PriorityDialog
                  targetId="add-priority"
                  textFieldLabel="Add Task Priority"
                  buttonLabel="Add"
                />
              </div>
              <div className="cm-form-field">
                <SingleDatePicker
                  dateValue={formValues.taskTime}
                  dateValueHandler={getDateValue}
                />
              </div>
            </div>

            <div className="cm-form-field cm-field-with-btn cm-flex-type-1">
              <FormControl fullWidth>
                <InputLabel>Task Tags</InputLabel>
                <Select
                  multiple
                  value={formValues.taskTags}
                  onChange={handleTaskTagsChange}
                  input={<Input />}
                  renderValue={(selected) => {
                    if (selected.length <= 5) {
                      return (
                        <div className={classes.chips}>
                          {selected.map((value) => (
                            <Chip
                              key={value}
                              label={value}
                              className={classes.chip}
                            />
                          ))}
                        </div>
                      );
                    }
                  }}
                  MenuProps={MenuProps}
                >
                  {tags.map((tag) => (
                    <MenuItem
                      key={tag}
                      value={tag}
                      style={getStyles(tag, formValues.taskTags, theme)}
                    >
                      {tag}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>Maximum 5 tags can be selected.</FormHelperText>
              </FormControl>
              <TagDialog
                targetId="add-tag"
                textFieldLabel="Add Tags"
                buttonLabel="Add"
              />
            </div>
          </form>
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button
            onClick={handleFormSubmit}
            color="primary"
            variant="contained"
          >
            Create
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

CreateTodo.defaultProps = {
  openDialogState: false,
  initialValues: {
    taskName: '',
    taskDescription: '',
    taskTime: new Date().toISOString(),
    taskPriority: '',
    taskTags: [],
  },
};

export default CreateTodo;
