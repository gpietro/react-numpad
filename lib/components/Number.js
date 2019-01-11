import React from 'react';
import { KeyPad } from '../elements';

const positiveValidation = value => !Number.isNaN(value) && parseInt(value, 10) > 0;

const integerValidation = value => !Number.isNaN(value) && parseFloat(value) % 1 === 0;

const positiveIntegerValidation = value =>
  !Number.isNaN(value) && parseFloat(value) % 1 === 0 && parseInt(value, 10) > 0;

const defaultProps = {
  validation: value => !Number.isNaN(value),
  formatInputValue: value => value.toString(), // TODO
  keyValid: (value = '', key) => {
    if (key === '-') {
      return !Number.isNaN(key + value + 1);
    }
    return !Number.isNaN(key === '.' ? value + key + 1 : value + key);
  },
  displayRule: value => value.replace(/^(-)?0+(0\.|\d)/, '$1$2'), // remove leading zeros
};

const NumberEditor = props => <KeyPad {...defaultProps} {...props} />;

export default NumberEditor;
export { positiveValidation, integerValidation, positiveIntegerValidation };
