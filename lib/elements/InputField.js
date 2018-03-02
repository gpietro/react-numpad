import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Label = styled.label`
  color: ${props => (props.disabled ? props.theme.color.secondary : props.theme.color.primary)};
`;
Label.displayName = 'Label';

class InputField extends Component {
  constructor(props) {
    super(props);
    this.onShowKeyPad = this.onShowKeyPad.bind(this);
  }

  onShowKeyPad() {
    const { showKeyPad } = this.props;
    const inputCoords = this.inputField ? this.inputField.getBoundingClientRect() : undefined;
    showKeyPad(inputCoords);
  }

  render() {
    const {
      placeholder,
      inputValue,
      dateFormat,
      displayRule,
      label,
      disabled,
      buttonContent,
      children,
    } = this.props;

    return (
      <Fragment>
        {label && <Label disabled={disabled}>{label}</Label>}
        <span
          onClick={this.onShowKeyPad}
          onKeyPress={this.onShowKeyPad}
          role="button"
          tabIndex={0}
          ref={input => {
            this.inputField = input;
          }}
        >
          {children ? (
            React.Children.map(children, child =>
              React.cloneElement(
                child,
                child.type === 'input'
                  ? {
                      placeholder,
                      value: inputValue ? displayRule(inputValue, dateFormat) : inputValue,
                      disabled,
                      tabIndex: -1,
                      readOnly: true,
                    }
                  : {}
              )
            )
          ) : (
            <Fragment>
              <input
                placeholder={placeholder}
                value={inputValue ? displayRule(inputValue, dateFormat) : inputValue}
                disabled={disabled}
                tabIndex={-1}
                readOnly
              />
              {buttonContent && <button tabIndex={-1}>{buttonContent}</button>}
            </Fragment>
          )}
        </span>
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
