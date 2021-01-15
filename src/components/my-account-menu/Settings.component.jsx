import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { TwitterPicker } from 'react-color';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';

import './MyAccount.styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { changeUserSetting } from '../../redux/app/app.action';

const palette = [
  '#eee3e7',
  '#ead5dc',
  '#eec9d2',
  '#b3cde0',
  '#e7eff6',
  '#a8e6cf',
  '#dcedc1',
  '#ebf4f6',
  '#fffef9',
  '#c0c5ce',
  '#cecbcb',
  '#eedbdb',
  '#f4e7e7',
  '#cbdadb',
  '#5a5a5a',
];

const Settings = () => {
  const dispatch = useDispatch();
  const {
    darkMode,
    cardColor,
    cardTxtColor,
    enableNotifications,
  } = useSelector((state) => state.todos.appScheme);

  const [values, setValues] = React.useState({
    darkMode,
    cardColor,
    cardTxtColor,
    enableNotifications,
  });

  const handleRadioChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleChange = (event) => {
    //if (event.target.name === 'darkMode')
    setValues({ ...values, [event.target.name]: event.target.checked });
  };

  const handleColorChange = (color) => {
    setValues((prevState) => ({
      ...prevState,
      cardColor: color.hex,
    }));
  };

  const handleSubmit = () => {
    dispatch(changeUserSetting(values));
  };

  return (
    <div className="cm-my-account-settings-container">
      <h1 className="cm-page-heading">Settings</h1>
      <div className="cm-settings-content">
        <FormControl component="fieldset" className="cm-radio-field">
          <FormLabel component="legend">Choose card text color:</FormLabel>
          <RadioGroup
            aria-label="choose card text color"
            name="cardTxtColor"
            value={values.cardTxtColor}
            onChange={handleRadioChange}
            row
          >
            <FormControlLabel
              value="#69665c"
              control={<Radio color="primary" />}
              label="Primary"
            />
            <FormControlLabel
              value="#ffffff"
              control={<Radio color="primary" />}
              label="Light"
            />
            <FormControlLabel
              value="#121212"
              control={<Radio color="primary" />}
              label="Dark"
            />
          </RadioGroup>
        </FormControl>
        <FormGroup row>
          <FormControlLabel
            control={
              <Switch
                checked={values.darkMode}
                onChange={handleChange}
                name="darkMode"
                color="primary"
              />
            }
            label="Enable Dark Mode"
            className="cm-form-field"
          />
          <FormControlLabel
            control={
              <Switch
                checked={false}
                name="enableNotifications"
                color="primary"
                disabled
              />
            }
            label="Enable Notifications(coming soon)"
            className="cm-form-field"
          />
        </FormGroup>
        <div className="cm-card-color-picker cm-flex-type-1">
          <p>Choose card color:</p>
          <TwitterPicker
            color={values.cardColor}
            colors={palette}
            onChange={handleColorChange}
          />
          <div
            className="cm-color-preview box-shadow-2"
            style={{
              backgroundColor: values.cardColor,
              color: values.cardTxtColor,
            }}
          >
            <h3>Preview Task</h3>
            <p>This is how your task card will look.</p>
          </div>
        </div>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default Settings;
