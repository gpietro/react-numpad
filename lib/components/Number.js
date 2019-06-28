import React from 'react';
import PropTypes from 'prop-types';
import { KeyPad } from '../elements';
import NumPad from './NumPad';
import StaticWrapper from './StaticWrapper';

const positiveValidation = value => parseFloat(value) >= 0;

const integerValidation = value => parseFloat(value) % 1 === 0;

const numberValidator = (decimal, negative) => value => {
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
  const validation = value => numberValidator(decimal, negative)(value);

  let validator = keyValidator;
  if (!validator) {
    validator = value => numberValidator(decimal, negative)(value);
  }

  const keyValid = isValid => (value = '', key) => {
    if (key === '-') {
      return value.charAt(0) === '-' || isValid(key + value + 1);
    }
    return isValid(key === '.' ? value + key + 1 : value + key);
  };

  const displayRule = value => value.replace(/^(-)?0+(0\.|\d)/, '$1$2'); // remove leading zeros

  if (inline) {
    return (
      <StaticWrapper {...props} displayRule={displayRule}>
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
  inline: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  keyValidator: PropTypes.func,
  decimal: PropTypes.bool,
  negative: PropTypes.bool,
};

NumberInput.defaultProps = {
  inline: false,
  children: undefined,
  keyValidator: undefined,
  decimal: true,
  negative: true,
};

export default NumberInput;
export { numberValidator, positiveValidation, integerValidation };
