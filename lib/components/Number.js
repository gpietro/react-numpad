import React from 'react';
import { KeyPad } from '../elements';

const positiveValidation = value => parseFloat(value) >= 0;

const integerValidation = value => parseFloat(value) % 1 === 0;

const numberValidatior = (decimal = true, sign = true) => value => {
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

  if (!sign && !positiveValidation(testValue)) {
    return false;
  }
  return true;
};

const defaultProps = {
  validation: value => numberValidatior(true, true)(value),
  formatInputValue: value => value.toString(),
  keyValidator: value => numberValidatior(true, true)(value),
  keyValid: (value = '', key, keyValidator) => {
    if (key === '-') {
      return keyValidator(key + value + 1);
    }
    return keyValidator(key === '.' ? value + key + 1 : value + key);
  },
  displayRule: value => value.replace(/^(-)?0+(0\.|\d)/, '$1$2'), // remove leading zeros
};

const NumberEditor = props => <KeyPad {...defaultProps} {...props} />;

export default NumberEditor;
export { numberValidatior, integerValidation, positiveValidation };
