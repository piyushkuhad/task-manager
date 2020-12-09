import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Avatar from '@material-ui/core/Avatar';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { useSelector, useDispatch } from 'react-redux';
import firebase from 'firebase';
import moment from 'moment';

import './Header.styles.scss';
import SingleDatePicker from '../date-picker/SingleDatePicker.component';
import CreateTodo from '../create-todo/CreateTodo.component';
import { cleanDate } from '../../utils/utilFn';
import { selectedDateChange } from '../../redux/app/app.action';

const Header = () => {
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const { displayName, photoURL } = useSelector((state) => state.firebase.auth);
  const { selectedDate } = useSelector((state) => state.todos);
  //moment('12/10/2020').toISOString()
  const [headerDate, setHeaderDate] = React.useState(
    moment(
      `${selectedDate.selectedMonth}/${selectedDate.selectedDay}/${selectedDate.selectedYear}`
    ).toDate()
  );

  // console.log(
  //   'selectedDate',
  //   headerDate,
  //   moment(headerDate).format('DD/MM/YYYY')
  // );

  React.useEffect(() => {
    setHeaderDate(
      moment(
        `${selectedDate.selectedMonth}/${selectedDate.selectedDay}/${selectedDate.selectedYear}`
      ).toDate()
    );
  }, [selectedDate]);

  const [openDialog, setOpenDialog] = React.useState(false);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const closeDialog = () => {
    setOpenDialog(false);
  };

  const signOutFn = (e) => {
    e.preventDefault();
    firebase.logout();
  };

  const onDateChange = (date) => {
    console.log('Changed Date', date);
    const dateObj = {
      selectedDay: cleanDate(date, 'DD'),
      selectedMonth: cleanDate(date, 'MM'),
      selectedYear: cleanDate(date, 'YYYY'),
    };
    dispatch(selectedDateChange(dateObj));
    setHeaderDate(date);
  };

  return (
    <div className="cm-header-container cm-flex-type-2">
      <div className="cm-page-center cm-flex-type-1">
        <div className="cm-logo">
          <h1>todo</h1>
        </div>
        <div className="cm-todo-menu cm-flex-type-1">
          <div className="cm-header-date-filter">
            <SingleDatePicker
              fieldLabel="Filter Date"
              dateValue={headerDate}
              dateValueHandler={onDateChange}
              pickerTimeFormat="dd MMM, yyyy"
            />
          </div>
          <IconButton
            color="primary"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            className="cm-add-todo-btn"
            onClick={() => setOpenDialog(true)}
          >
            <AddRoundedIcon />
          </IconButton>
          <IconButton
            color="primary"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
          >
            {!photoURL ? (
              <AccountCircleIcon />
            ) : (
              <Avatar
                alt={displayName}
                src={photoURL}
                className="cm-small-avatar"
              />
            )}
          </IconButton>

          <Menu
            id="menu-appbar"
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
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={signOutFn}>Logout</MenuItem>
          </Menu>
          <CreateTodo
            openDialogState={openDialog}
            closeDialogHandler={closeDialog}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
