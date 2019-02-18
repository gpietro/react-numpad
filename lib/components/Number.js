import React from 'react';
import PropTypes from 'prop-types';
import { KeyPad } from '../elements';
import NumPad from './NumPad';
import StaticWrapper from './StaticWrapper';

const positiveValidation = value => parseFloat(value) >= 0;

const integerValidation = value => parseFloat(value) % 1 === 0;

const numberValidator = (decimal = true, negative = true) => value => {
  if (Number.isNaN(Number(value))) {
    return false;
  }

  const floatValue = parseFloat(value);

  if (!decimal && !integerValidation(floatValue)) {
    return false;
  }

  if (typeof decimal === 'number' && decimal > 0) {
    if ((floatValue.toString().split('.')[1] || '').length > decimal) {
      return false;
    }
  }

  if (!negative && !positiveValidation(floatValue)) {
    return false;
  }
  return true;
};

const NumberInput = ({ inline, children, keyValidator, decimal, negative, ...props }) => {
  const validation = value => numberValidator(true, true)(value);

  const validator =
    keyValidator ||
    function(value) {
      return numberValidator(decimal, negative)(value);
    };

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
        <KeyPad
          validation={validation}
          keyValid={keyValid(validator)}
          displayRule={displayRule}
          {...props}
        />
      </StaticWrapper>
    );
  }
  return (
    <NumPad {...props} customInput={children} displayRule={displayRule}>
      <KeyPad
        validation={validation}
        keyValid={keyValid(validator)}
        displayRule={displayRule}
        {...props}
      />
    </NumPad>
  );
};

NumberInput.propTypes = {
  confirm: PropTypes.func,
  cancel: PropTypes.func,
  inline: PropTypes.bool,
};

NumberInput.defaultProps = {
  inline: false,
  confirm: () => console.warn('Confirm callback is undefined'),
  cancel: () => console.warn('Cancel callback is undefined'),
};

export default NumberInput;
