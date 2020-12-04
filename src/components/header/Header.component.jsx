import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Avatar from '@material-ui/core/Avatar';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { useSelector } from 'react-redux';
import firebase from 'firebase';

import './Header.styles.scss';
import CreateTodo from '../create-todo/CreateTodo.component';

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const { displayName, photoURL } = useSelector((state) => state.firebase.auth);
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

  return (
    <div className="cm-header-container cm-flex-type-2">
      <div className="cm-page-center cm-flex-type-1">
        <div className="cm-logo">
          <h1>todo</h1>
        </div>
        <div className="cm-todo-menu">
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
