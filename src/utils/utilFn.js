import moment from 'moment';

export const cleanDate = (dateParam, dateFormat) =>
  moment(dateParam).format(dateFormat);
