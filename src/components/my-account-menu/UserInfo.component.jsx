import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import MuiPhoneNumber from 'material-ui-phone-number';
import userPlaceholder from '../../assets/images/user.svg';
import TextField from '@material-ui/core/TextField';
import EditIcon from '@material-ui/icons/Edit';

import './MyAccount.styles.scss';
import { changeUserInfo, showSnackbar } from '../../redux/app/app.action';
import ChangePassword from '../change-password/ChangePassword.component';

const UserInfo = () => {
  const dispatch = useDispatch();

  const { avatarUrl, displayName, email, mobileNumber } = useSelector(
    (state) => state.firebase.profile
  );
  const [formValues, setFormValues] = React.useState({
    fullName: displayName,
    mobileNumber: mobileNumber ? mobileNumber : '',
    imgUpload: avatarUrl,
    imgToShow: avatarUrl,
  });

  React.useEffect(() => {
    setFormValues((prevState) => ({
      ...prevState,
      mobileNumber: mobileNumber ? mobileNumber : '',
      imgUpload: avatarUrl,
      imgToShow: avatarUrl,
    }));
    // eslint-disable-next-line
  }, [mobileNumber, avatarUrl]);

  const [formErr, setFormErr] = React.useState({
    isFormErr: false,
    fullName: {
      isRequired: true,
      isFieldErr: false,
    },
    requiredErrMsg: (fieldName) => `${fieldName} is required.`,
  });

  const [reAuth, setReAuth] = React.useState(false);

  React.useEffect(() => {
    setFormValues((prevState) => ({ ...prevState, fullName: displayName }));
  }, [displayName]);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const handleFieldChange = (e) => {
    setFormValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();

      reader.onload = function (event) {
        setFormValues((prevState) => ({
          ...prevState,
          imgUpload: e.target.files[0],
          imgToShow: event.target.result,
        }));
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleMobileFieldChange = (value) => {
    setFormValues((prevState) => ({
      ...prevState,
      mobileNumber: value,
    }));
  };

  const chkValidation = (fieldName) => {
    if (formValues[fieldName] === '' && formErr[fieldName]['isRequired']) {
      setFormErr((prevState) => ({
        ...prevState,
        isFormErr: true,
        [fieldName]: { isFieldErr: true },
      }));
    } else {
      setFormErr((prevState) => ({
        ...prevState,
        isFormErr: false,
        [fieldName]: { isFieldErr: false },
      }));
    }
  };

  const handleFormSubmit = () => {
    console.log('formValues', formValues);
    const { imgUpload, fullName } = formValues;
    // let uploadImg = storage.ref(`images/${imgUpload.name}`).put(imgUpload);

    if (
      (imgUpload !== avatarUrl && imgUpload !== undefined) ||
      fullName.toLowerCase() !== displayName.toLowerCase() ||
      (formValues.mobileNumber !== mobileNumber &&
        formValues.mobileNumber !== '')
    ) {
      dispatch(changeUserInfo(formValues));
    } else {
      dispatch(
        showSnackbar({
          message:
            'Nothing to save. Make some changes and then hit "Update Profile"',
          severity: 'info',
        })
      );
    }
  };

  const handleDialogClose = () => {
    setReAuth(false);
  };

  return (
    <div className="cm-user-info-container">
      <h1 className="cm-page-heading">User Info</h1>
      <div className="cm-profile-image-container">
        <div className="cm-profile-image">
          <img
            src={formValues.imgToShow ? formValues.imgToShow : userPlaceholder}
            alt={displayName}
            className="box-shadow-2"
          />
          <div
            aria-label="Change profile photo"
            className="cm-change-img-btn cm-flex-type-2"
          >
            <label htmlFor="imgUpload">
              <EditIcon style={{ color: '#ffffff' }} />
            </label>
          </div>
          <input
            type="file"
            name="imgUpload"
            id="imgUpload"
            accept="image/x-png,image/gif,image/jpeg"
            onChange={handleImageChange}
            hidden
          />
        </div>
        <h3>{displayName}</h3>
      </div>
      <div className="cm-profile-info">
        <form onSubmit={submitHandler} autoComplete="off">
          <div className="cm-form-field-half cm-flex-type-1">
            <div className="cm-form-field">
              <TextField
                name="fullName"
                label="Display Name"
                fullWidth
                value={formValues.fullName}
                InputLabelProps={{ shrink: true }}
                onChange={handleFieldChange}
                variant="outlined"
                error={formErr.fullName.isFieldErr}
                onBlur={() => chkValidation('fullName')}
                helperText={
                  formErr.fullName.isFieldErr
                    ? formErr.requiredErrMsg('Full Name')
                    : null
                }
              />
            </div>
            <div className="cm-form-field">
              <TextField
                name="userEmail"
                label="Email"
                fullWidth
                disabled
                value={email}
                InputLabelProps={{ shrink: true }}
                variant="outlined"
              />
            </div>
          </div>
          <div className="cm-form-field-half cm-flex-type-1">
            <div className="cm-form-field">
              <MuiPhoneNumber
                defaultCountry={'in'}
                onlyCountries={['in', 'us', 'ca']}
                onChange={handleMobileFieldChange}
                name="mobileNumber"
                fullWidth
                label="Mobile Number(Optional)"
                variant="outlined"
                value={formValues.mobileNumber}
              />
            </div>
            <div className="cm-form-field cm-flex-type-2">
              <Button
                onClick={() => {
                  setReAuth(true);
                }}
                color="default"
                variant="contained"
              >
                Change current password
              </Button>
            </div>
          </div>
          <Button
            onClick={handleFormSubmit}
            color="primary"
            variant="contained"
            disabled={formErr.isFormErr}
          >
            Update Profile
          </Button>
        </form>
        <ChangePassword
          shouldOpen={reAuth}
          onDialogClose={handleDialogClose}
          userData={{ avatarUrl, displayName, email }}
        />
      </div>
    </div>
  );
};

export default UserInfo;
