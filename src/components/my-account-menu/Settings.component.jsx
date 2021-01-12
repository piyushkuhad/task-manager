import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { TwitterPicker } from 'react-color';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

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

  React.useEffect(() => {
    dispatch(changeUserSetting(values));

    // eslint-disable-next-line
  }, [values]);

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

  console.log('values', values);

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
              value="#000000"
              control={<Radio color="primary" />}
              label="Dark"
            />
          </RadioGroup>
        </FormControl>
        <FormGroup>
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
                checked={values.enableNotifications}
                onChange={handleChange}
                name="enableNotifications"
                color="primary"
              />
            }
            label="Enable Notifications"
            className="cm-form-field"
          />
        </FormGroup>
        <div className="cm-tag-color-picker cm-flex-type-1">
          <p>Choose card color:</p>
          <TwitterPicker
            color={values.cardColor}
            colors={palette}
            onChange={handleColorChange}
          />
          <div
            className="cm-color-preview box-shadow-2"
            style={{ backgroundColor: values.cardColor }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
