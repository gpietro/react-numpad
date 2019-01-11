import React from 'react';
import PropTypes from 'prop-types';
import { display, validate, padding } from '../utils/date';
import { KeyPad } from '../elements';

const defaultProps = {
  validation: (value = '') => value.length === 12,
  formatInputValue: value => value.toString().replace(/\D+/g, ''),
  keyValid: (value, key, dateFormat) => {
    if (value.length === 12) return false;
    const paddingDate = padding(value + key, dateFormat);
    return validate(paddingDate, dateFormat, value.length);
  },
  displayRule: (value = '', dateFormat) => display(value, dateFormat.replace(/[a-z]/gi, '_')),
};

const DateTime = props => <KeyPad {...defaultProps} {...props} />;

DateTime.propsType = {
  dateFormat: PropTypes.string,
};

DateTime.defaultProps = {
  dateFormat: 'DD.MM.YYYY HH:mm',
};

export default DateTime;
