import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Label = styled.label`
  color: ${props =>
    props.disabled ? props.theme.color.secondary : props.theme.color.primary};
  font-size: 0.8em;
`;
Label.displayName = 'Label';

const Input = styled.input``;
Input.displayName = 'Input';

const InputField = ({
  placeholder,
  showKeyPad,
  value,
  dateFormat,
  displayRule,
  label,
  disabled,
  buttonContent,
  children,
}) => (
  <div role="presentation" className="numpad-input-value" onClick={showKeyPad}>
    {label && <Label disabled={disabled}>{label}</Label>}
    {children ? (
      React.Children.map(children, child =>
        React.cloneElement(
          child,
          child.type === 'input'
            ? {
                placeholder,
                value: value ? displayRule(value, dateFormat) : value,
                disabled,
                readOnly: true,
              }
            : {}
        )
      )
    ) : (
      <Fragment>
        <Input
          placeholder={placeholder}
          value={value ? displayRule(value, dateFormat) : value}
          disabled={disabled}
          readOnly
        />
        {buttonContent && <button>{buttonContent}</button>}
      </Fragment>
    )}
  </div>
);

InputField.displayName = 'InputField';

InputField.defaultProps = {
  placeholder: '',
  value: '',
  dateFormat: 'MM/DD/YYYY',
  label: '',
  disabled: false,
  buttonContent: undefined,
  children: undefined,
};

InputField.propTypes = {
  showKeyPad: PropTypes.func.isRequired,
  displayRule: PropTypes.func.isRequired,
  dateFormat: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  buttonContent: PropTypes.element,
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.element),
  ]),
};

export default InputField;
