import React from 'react';
import IconClock from 'react-icons/lib/md/access-time';
import moment from 'moment';
import NumPad from './NumPad';
import { KeyPad } from '../elements';

const validation = (value = '') => value.length === 4;
const formatInputValue = value => value.toString().replace(/\D+/g, '');
const keyValid = (value = '', key) => {
  if (value.length === 4 || key === '-' || key === '.') return false;
  const time = value + key + '0'.repeat(3 - value.length);
  return moment(time, 'HHmm').isValid();
};

const displayRule = (value = '') => {
  const newValue = value + '_'.repeat(4 - value.length);
  const splitValue = newValue ? [newValue.substr(0, 2), newValue.substr(2, 4)] : '';
  return newValue.length > 1 ? splitValue.join(':') : splitValue;
};

const inputButtonContent = <IconClock />;

export default NumPad({
  element: KeyPad,
  validation,
  formatInputValue,
  displayRule,
  inputButtonContent,
  keyValid,
});
