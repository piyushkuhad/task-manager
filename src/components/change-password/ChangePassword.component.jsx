import React from 'react';
import firebase from 'firebase/app';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Avatar from '@material-ui/core/Avatar';
import userPlaceholder from '../../assets/images/user.svg';

import './ChangePassword.styles.scss';
import { showSnackbar } from '../../redux/app/app.action';
import { useDispatch } from 'react-redux';

const ChangePassword = ({
  shouldOpen,
  onDialogClose,
  userData,
  initialValue,
}) => {
  const dispatch = useDispatch();

  const [values, setValues] = React.useState(initialValue);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = (fieldName) => {
    setValues({ ...values, [fieldName]: !values[fieldName] });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClose = () => {
    onDialogClose();
  };

  const reauthenticate = (currentPassword) => {
    var user = firebase.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(
      user.email,
      currentPassword
    );
    return user.reauthenticateWithCredential(cred);
  };

  const onFormSubmit = () => {
    reauthenticate(values.currentPassword)
      .then(() => {
        const user = firebase.auth().currentUser;
        if (values.newPassword !== values.confirmPassword) {
          throw new Error('Passwords do not match.');
        }

        user
          .updatePassword(values.newPassword)
          .then(() => {
            onDialogClose();
            setValues(initialValue);
            dispatch(
              showSnackbar({
                message: 'Password changed successfully.',
                severity: 'success',
              })
            );
          })
          .catch((err) => {
            dispatch(
              showSnackbar({
                message: err.message,
                severity: 'error',
              })
            );
          });
      })
      .catch((err) => {
        dispatch(
          showSnackbar({
            message: err.message,
            severity: 'error',
          })
        );
      });
  };

  return (
    <div>
      <Dialog
        open={shouldOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
        maxWidth={'xs'}
      >
        <DialogTitle id="form-dialog-title">Change Password</DialogTitle>
        <DialogContent>
          <div className="cm-user-data-wrapper cm-flex-type-2">
            <Avatar
              alt={userData.displayName}
              src={!!userData.avatarUrl ? userData.avatarUrl : userPlaceholder}
              className="cm-reauth-avatar"
            />
            <div className="cm-user-data-content">
              <h4>{userData.displayName}</h4>
              <p>{userData.email}</p>
            </div>
          </div>

          <div className="cm-change-pass-fields">
            <FormControl className="cm-form-field" variant="outlined" fullWidth>
              <InputLabel htmlFor="outlined-adornment-password">
                Current Password
              </InputLabel>
              <OutlinedInput
                type={values.showPassword ? 'text' : 'password'}
                value={values.currentPassword}
                onChange={handleChange('currentPassword')}
                fullWidth
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => handleClickShowPassword('showPassword')}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={140}
              />
            </FormControl>
            <FormControl className="cm-form-field" variant="outlined" fullWidth>
              <InputLabel htmlFor="outlined-adornment-password">
                New Password
              </InputLabel>
              <OutlinedInput
                type={values.showNewPassword ? 'text' : 'password'}
                value={values.newPassword}
                onChange={handleChange('newPassword')}
                fullWidth
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => handleClickShowPassword('showNewPassword')}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showNewPassword ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={140}
              />
            </FormControl>
            <FormControl className="cm-form-field" variant="outlined" fullWidth>
              <InputLabel htmlFor="outlined-adornment-password">
                Confirm Password
              </InputLabel>
              <OutlinedInput
                type={values.showConfirmPassword ? 'text' : 'password'}
                value={values.confirmPassword}
                onChange={handleChange('confirmPassword')}
                fullWidth
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() =>
                        handleClickShowPassword('showConfirmPassword')
                      }
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showConfirmPassword ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={140}
              />
            </FormControl>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onFormSubmit} color="primary">
            Change Password
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

ChangePassword.defaultProps = {
  shouldOpen: false,
  initialValue: {
    currentPassword: '',
    showPassword: false,
    newPassword: '',
    showNewPassword: false,
    confirmPassword: '',
    showConfirmPassword: false,
  },
};

export default ChangePassword;
