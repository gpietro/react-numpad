import React from 'react';
import NumPad from './NumPad';
import IconEdit from 'react-icons/lib/md/edit';

const DefaultValidation = {
  float: value => true,
  negative: value => true
};

const PositiveValidation = {
  float: value => true,
  negative: value => parseInt(value) > 0
};

const IntegerValidation = {
  float: value => parseFloat(value) % 1 === 0,
  negative: value => true
};

const PositiveIntegerValidation = {
  float: value => parseFloat(value) % 1 === 0,
  negative: value => parseInt(value) > 0
};

const defaultProps = Validation => ({
  validation: value => value.length > 0,
  keyValid: (value = '', key) => {
    let next;
    if (key === '-') {
      next = value.charAt(0) === '-' ? value.substr(1) : key + value;
    } else {
      next = key === '.' ? value + key + 1 : value + key;
    }
    return !isNaN(next) && Validation.float(next) && Validation.negative(next);
  },
  displayRule: value => value,
  inputButtonContent: <IconEdit />
});

const Number = NumPad(defaultProps(DefaultValidation));
const PositiveNumber = NumPad(defaultProps(PositiveValidation));
const IntegerNumber = NumPad(defaultProps(IntegerValidation));
const PositiveIntegerNumber = NumPad(defaultProps(PositiveIntegerValidation));

export { Number, PositiveNumber, IntegerNumber, PositiveIntegerNumber };
