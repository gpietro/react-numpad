import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Label = styled.label`
  color: ${props => (props.disabled ? props.theme.color.secondary : props.theme.color.primary)};
`;
Label.displayName = 'Label';

class InputField extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      placeholder,
      showKeyPad,
      inputValue,
      dateFormat,
      displayRule,
      getPosition,
      label,
      disabled,
      buttonContent,
      children,
    } = this.props;

    return (
      <Fragment>
        {label && <Label disabled={disabled}>{label}</Label>}
        {children ? (
          React.Children.map(children, child =>
            React.cloneElement(
              child,
              child.type === 'input'
                ? {
                    placeholder,
                    value: inputValue ? displayRule(inputValue, dateFormat) : inputValue,
                    disabled,
                    readOnly: true,
                    onClick: () => {
                      showKeyPad(this.inputCoords);
                    },
                    ref: input => {
                      if (input) this.inputCoords = input.getBoundingClientRect();
                    },
                  }
                : {
                    onClick: () => {
                      showKeyPad(this.inputCoords);
                    },
                    ref: input => {
                      if (input) this.inputCoords = input.getBoundingClientRect();
                    },
                  }
            )
          )
        ) : (
          <Fragment>
            <input
              placeholder={placeholder}
              value={inputValue ? displayRule(inputValue, dateFormat) : inputValue}
              disabled={disabled}
              onClick={() => showKeyPad(this.inputCoords)}
              ref={input => {
                if (input) this.inputCoords = input.getBoundingClientRect();
              }}
              readOnly
            />
            {buttonContent && (
              <button
                onClick={() => showKeyPad(this.inputCoords)}
                ref={input => {
                  if (input) this.inputCoords = input.getBoundingClientRect();
                }}
              >
                {buttonContent}
              </button>
            )}
          </Fragment>
        )}
      </Fragment>
    );
  }
}

InputField.displayName = 'InputField';

InputField.defaultProps = {
  placeholder: '',
  inputValue: '',
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
  inputValue: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  buttonContent: PropTypes.element,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.arrayOf(PropTypes.element)]),
};

export default InputField;
