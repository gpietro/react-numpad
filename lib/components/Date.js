import React from 'react';
import IconClock from 'react-icons/lib/md/access-time';
import NumPad from './NumPad';
import dateUtils from '../utils/date';
import { KeyPad } from '../elements';

const validation = (value = '') => value.length === 8;

const formatInputValue = value => value.toString().replace(/\D+/g, '');

const keyValid = (value = '', key, dateFormat) => {
  if (value.length === 8 || key === '-' || key === '.') return false;
  return dateUtils.validate(value, key, dateFormat);
};

const displayRule = (value = '', dateFormat = 'MM/DD/YYYY') => dateUtils.display(value, dateFormat);

const inputButtonContent = <IconClock />;

export default NumPad({
  element: KeyPad,
  validation,
  formatInputValue,
  displayRule,
  inputButtonContent,
  keyValid,
});
