import React from 'react';
import IconClock from 'react-icons/lib/md/access-time';
import moment from 'moment';
import NumPad from './NumPad';
import dateUtils from '../utils/date';
import { KeyPad } from '../elements';

const validation = (value = '') => value.length === 12;
const formatInputValue = value => value.toString().replace(/\D+/g, '');
const keyValid = (value = '', key, dateFormat) => {
  if (value.length === 12 || key === '-' || key === '.') return false;
  if (value.length < 8) {
    // verify date
    return dateUtils.validate(value, key, dateFormat);
  }
  // verify time
  const timeFormat = 'HH:mm';
  const time = value.substr(8, 4) + key + '0000'.substring(Math.max(0, value.length - 8));
  return moment(time, timeFormat).isValid();
};

const displayRule = (value = '', dateFormat) => {
  let time = value.substring(8, 12);
  time += '_'.repeat(4 - time.length);
  const displayTime = [time.substr(0, 2), time.substr(2, 2)];
  return `${dateUtils.display(value, dateFormat)} ${displayTime.join(':')}`;
};

const inputButtonContent = <IconClock />;

const float = false;

const negative = false;

export default NumPad({
  element: KeyPad,
  validation,
  formatInputValue,
  displayRule,
  inputButtonContent,
  float,
  negative,
  keyValid,
});
