import React from 'react';
import { KeyPad } from '../elements';
import NumPad from './NumPad';

const positiveValidation = value => parseFloat(value) >= 0;

const integerValidation = value => parseFloat(value) % 1 === 0;

const numberValidator = (decimal = true, negative = true) => value => {
  if (Number.isNaN(Number(value))) {
    return false;
  }

  const testValue = parseFloat(value);

  if (!decimal && !integerValidation(testValue)) {
    return false;
  }

  if (typeof decimal === 'number' && decimal > 0) {
    if ((testValue.toString().split('.')[1] || '').length > decimal) {
      return false;
    }
  }

  if (!negative && !positiveValidation(testValue)) {
    return false;
  }
  return true;
};

const defaultProps = props => ({
  validation: value => numberValidator(true, true)(value),
  formatInputValue: value => value.toString(),
  keyValidator: value => numberValidator(props.decimal, props.negative)(value),
  keyValid: (value = '', key, keyValidator) => {
    if (key === '-') {
      return value.charAt(0) === '-' || keyValidator(key + value + 1);
    }
    return keyValidator(key === '.' ? value + key + 1 : value + key);
  },
  displayRule: value => value.replace(/^(-)?0+(0\.|\d)/, '$1$2'), // remove leading zeros
  ...props,
});

const NumberInput = props => (
  <NumPad {...props} customInput={props.children}>
    <KeyPad {...defaultProps(props)} />
  </NumPad>
);

export default NumberInput;
