import React from 'react';
import PropTypes from 'prop-types';
import NumPad from './NumPad';
import StaticWrapper from './StaticWrapper';
import { Container } from '../elements/Wrapper';
import { display, validate, padding } from '../utils/date';
import { KeyPad } from '../elements';

const defaultProps = props => ({
  validation: (value = '', dateFormat) => validate(value, dateFormat, dateFormat.length),
  formatInputValue: value => value.toString().replace(/\D+/g, ''),
  keyValid: (value, key, dateFormat) => {
    if (['.', '-'].includes(key)) return false;
    if (value.length === 12) return false;
    const paddingDate = padding(value + key, dateFormat);
    return validate(paddingDate, dateFormat, value.length);
  },
  displayRule: (value = '', dateFormat) => display(value, dateFormat.replace(/[a-z]/gi, '_')),
  ...props,
});

const DateTimeInput = props => (
  <NumPad {...props} customInput={props.children}>
    <KeyPad {...defaultProps(props)} />
  </NumPad>
);

const DateTimeKeyPad = props => (
  <StaticWrapper {...props}>
    <Container>
      <KeyPad {...defaultProps(props)} />
    </Container>
  </StaticWrapper>
);

DateTimeInput.propsType = {
  dateFormat: PropTypes.string,
};

DateTimeInput.defaultProps = {
  dateFormat: 'DD.MM.YYYY HH:mm',
};

export { DateTimeInput, DateTimeKeyPad };
