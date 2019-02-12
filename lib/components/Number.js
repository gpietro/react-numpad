import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { KeyPad } from '../elements';
import NumPad from './NumPad';
import StaticWrapper from './StaticWrapper';
import { Container } from '../elements/Wrapper';

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

const NumberInput = props => {
  const { inline, children, keyValidator, decimal, negative } = props;

  const validation = value => numberValidator(true, true)(value);

  const formatInputValue = value => value.toString();

  const validator = keyValidator
    ? keyValidator
    : value => numberValidator(decimal, negative)(value);

  const keyValid = validator => (value = '', key) => {
    if (key === '-') {
      return value.charAt(0) === '-' || validator(key + value + 1);
    }
    return validator(key === '.' ? value + key + 1 : value + key);
  };

  const displayRule = value => value.replace(/^(-)?0+(0\.|\d)/, '$1$2'); // remove leading zeros

  if (inline) {
    return (
      <StaticWrapper {...props}>
        <Container>
          <KeyPad
            validation={validation}
            formatInputValue={formatInputValue}
            keyValid={keyValid(validator)}
            displayRule={displayRule}
            {...props}
          />
        </Container>
      </StaticWrapper>
    );
  }
  return (
    <NumPad {...props} customInput={children}>
      <KeyPad
        validation={validation}
        formatInputValue={formatInputValue}
        keyValid={keyValid(validator)}
        displayRule={displayRule}
        {...props}
      />
    </NumPad>
  );
};

NumberInput.propTypes = {
  inline: PropTypes.bool,
};

NumberInput.defaultProps = {
  inline: false,
};

export default NumberInput;
