import React, { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import { getISOFormat } from '../../redux/reducer.utils';

const SingleDatePicker = (props) => {
  const [selectedDate, setSelectedDate] = useState(props.dateValue);

  React.useEffect(() => {
    setSelectedDate(props.dateValue);
  }, [props.dateValue]);

  const handleDateChange = (date) => {
    //console.log('date!', date, date.toISOString());
    props.dateValueHandler(getISOFormat(date));
    setSelectedDate(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
        value={selectedDate}
        label={props.fieldLabel}
        onChange={handleDateChange}
        format={props.pickerTimeFormat}
        fullWidth
      />
    </MuiPickersUtilsProvider>
  );
};

SingleDatePicker.defaultProps = {
  fieldLabel: 'Task Date',
  pickerTimeFormat: 'dd MMM, yyyy',
};

export default SingleDatePicker;
