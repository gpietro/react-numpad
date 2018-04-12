import React from 'react';
import MdCalendar from 'react-icons/lib/md/date-range';
import moment from 'moment';
import { Calendar } from '../elements';
import dateUtils from '../utils/date';
import NumPad from './NumPad';

const validation = () => true;

const formatInputValue = value => value.toString().replace(/\D+/g, '');

const keyValid = (value, min, max, dateFormat) => {
  const validAfter = min ? value.isSameOrAfter(moment(min, dateFormat)) : true;
  const validBefore = max ? value.isSameOrBefore(moment(max, dateFormat)) : true;
  return validAfter && validBefore;
};

const displayRule = (value = '', dateFormat = 'MM/DD/YYYY') => dateUtils.display(value, dateFormat);

const inputButtonContent = <MdCalendar />;

export default NumPad({
  element: Calendar,
  keyValid,
  formatInputValue,
  validation,
  displayRule,
  inputButtonContent,
});
