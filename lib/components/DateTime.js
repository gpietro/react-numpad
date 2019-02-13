import React from 'react';
import PropTypes from 'prop-types';
import NumPad from './NumPad';
import StaticWrapper from './StaticWrapper';
import { Container } from '../elements/Wrapper';
import { display, validate, padding } from '../utils/date';
import { KeyPad } from '../elements';

const DateTimeInput = ({ inline, dateFormat, ...props }) => {
  const validation = (value = '') => validate(value, dateFormat, dateFormat.length);

  const formatInputValue = value => value.toString().replace(/\D+/g, '');

  const keyValid = (value, key) => {
    if (['.', '-'].includes(key)) return false;
    if (value.length === 12) return false;
    const paddingDate = padding(value + key, dateFormat);
    return validate(paddingDate, dateFormat, value.length);
  };

  const displayRule = (value = '') => display(value, dateFormat.replace(/[a-z]/gi, '_'));

  if (inline) {
    return (
      <StaticWrapper {...props}>
        <Container>
          <KeyPad
            validation={validation}
            formatInputValue={formatInputValue}
            keyValid={keyValid}
            displayRule={displayRule}
            {...props}
          />
        </Container>
      </StaticWrapper>
    );
  }
  return (
    <NumPad {...props} customInput={props.children}>
      <KeyPad
        validation={validation}
        formatInputValue={formatInputValue}
        keyValid={keyValid}
        displayRule={displayRule}
        {...props}
      />
    </NumPad>
  );
};

DateTimeInput.propsType = {
  dateFormat: PropTypes.string,
  inline: PropTypes.bool,
  displayRule: PropTypes.func,
  validation: PropTypes.func,
  formatInputValue: PropTypes.func,
};

DateTimeInput.defaultProps = {
  dateFormat: 'DD.MM.YYYY HH:mm',
  inline: false,
};

export default DateTimeInput;
