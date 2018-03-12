import React from 'react';
import MdCalendar from 'react-icons/lib/md/date-range';
import moment from 'moment';
import { Appointment } from '../elements';
import dateUtils from '../utils/date';
import NumPad from './NumPad';

const validation = () => true;

const keyValid = (value, minDate, maxDate, dateFormat) => {
  const validAfter = minDate ? value.isSameOrAfter(moment(minDate, dateFormat)) : true;
  const validBefore = maxDate ? value.isSameOrBefore(moment(maxDate, dateFormat)) : true;
  return validAfter && validBefore;
};

const displayRule = (value = '', dateFormat = 'MM/DD/YYYY') => dateUtils.display(value, dateFormat);

const inputButtonContent = <MdCalendar />;

export default NumPad({
  element: Appointment,
  keyValid,
  validation,
  displayRule,
  inputButtonContent,
});
