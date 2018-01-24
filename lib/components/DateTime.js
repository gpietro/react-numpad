import React from 'react';
import NumPad from './NumPad';
import IconClock from 'react-icons/lib/md/access-time';
import moment from 'moment';
import dateUtils from '../utils/date';

const validation = (value = '') => {
  return value.length === 12;
};

const keyValid = (value = '', key, dateFormat) => {
  if (value.length === 12 || key === '-' || key === '.') return false;
  if (value.length < 8) {
    // verify date
    return dateUtils.validate(value, key, dateFormat);
  } else {
    // verify time
    let timeFormat = 'HH:mm';
    let time =
      value.substr(8, 4) +
      key +
      '0000'.substring(Math.max(0, value.length - 8));
    return moment(time, timeFormat).isValid();
  }
};

const displayRule = (value = '', dateFormat) => {
  let time = value.substring(8, 12);
  time += '_'.repeat(4 - time.length);
  let displayTime = [time.substr(0, 2), time.substr(2, 2)];
  return `${dateUtils.display(value, dateFormat)} ${displayTime.join(':')}`;
};

const inputButtonContent = <IconClock />;

const float = false;

const negative = false;

export default NumPad({
  validation,
  displayRule,
  inputButtonContent,
  float,
  negative,
  keyValid
});
