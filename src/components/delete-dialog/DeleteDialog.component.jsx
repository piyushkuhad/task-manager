import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch } from 'react-redux';

import { deleteTodo } from '../../redux/todo/todo.action';

const DeleteDialog = ({ shouldOpen, data, closeHandler }) => {
  const dispatch = useDispatch();

  const handleClose = () => {
    closeHandler();
  };

  const onDeleteClick = () => {
    dispatch(deleteTodo(data));
    closeHandler();
  };

  return (
    <div>
      <Dialog
        open={shouldOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Delete Todo?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete{' '}
            <strong>"{data ? data.taskName : null}"</strong>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onDeleteClick} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

DeleteDialog.defaultProps = {
  shouldOpen: false,
};

export default DeleteDialog;
