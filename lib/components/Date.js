import React from 'react';
import NumPad from './NumPad';
import IconClock from 'react-icons/lib/md/access-time';
import moment from 'moment';
import dateUtils from '../utils/date';

const validation = (value = '') => {
  return value.length === 8;
};

const keyValid = (value = '', key, dateFormat) => {
  if (value.length === 8 || key === '-' || key === '.') return false;
  return dateUtils.validate(value, key, dateFormat);
};

const displayRule = (value = '', dateFormat = 'MM/DD/YYYY') =>
  dateUtils.display(value, dateFormat);

const inputButtonContent = <IconClock />;

export default NumPad({
  validation,
  displayRule,
  inputButtonContent,
  keyValid
});
