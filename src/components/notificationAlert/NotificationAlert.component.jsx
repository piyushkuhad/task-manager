import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';

import { hideSnackbar } from '../../redux/app/app.action';
import './NotificationAlert.styles.scss';

const NotificationAlert = ({
  notificationInfo,
  open,
  snackBarCloseHandler,
}) => {
  //const notificationInfo = useSelector((state) => state.todos.appNotification);

  // const [open, setOpen] = React.useState(!!notificationInfo.message);

  const dispatch = useDispatch();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    snackBarCloseHandler();

    //setOpen(false);
    setTimeout(() => {
      dispatch(hideSnackbar());
    }, 500);
  };

  const messageIcon = () => {
    const type = notificationInfo.severity;
    let notifIcon;
    switch (type) {
      case 'error':
        notifIcon = (
          <ErrorOutlineOutlinedIcon
            fontSize="small"
            style={{ color: '#f44336' }}
          />
        );
        break;

      case 'warning':
        notifIcon = (
          <ReportProblemOutlinedIcon
            fontSize="small"
            style={{ color: '#ff9800' }}
          />
        );
        break;

      case 'info':
        notifIcon = (
          <InfoOutlinedIcon fontSize="small" style={{ color: '#2196f3' }} />
        );
        break;

      case 'success':
        notifIcon = (
          <CheckCircleOutlinedIcon
            fontSize="small"
            style={{ color: '#4caf50' }}
          />
        );
        break;

      default:
        notifIcon = (
          <HelpOutlineOutlinedIcon
            fontSize="small"
            style={{ color: '#f44336' }}
          />
        );
        break;
    }

    const finalMsg = (
      <>
        {notifIcon}
        <span>{`${notificationInfo.message}`}</span>
      </>
    );

    return finalMsg;
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      message={messageIcon()}
      className={notificationInfo.severity}
      action={
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      }
    />
  );
};

export default NotificationAlert;
