import React, { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { getISOFormat } from '../../redux/reducer.utils';

const DatePicker = ({ dateValue, dateValueHandler }) => {
  const [selectedDate, handleDateChange] = useState(dateValue);

  const dateChangHandler = (date) => {
    //console.log('date', date, date.toISOString());
    dateValueHandler(getISOFormat(date));
    handleDateChange(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DateTimePicker
        value={selectedDate}
        label="Task Time"
        onChange={dateChangHandler}
        format="dd MMM, yyyy hh:mm a"
        fullWidth
      />
    </MuiPickersUtilsProvider>
  );
};

export default DatePicker;
