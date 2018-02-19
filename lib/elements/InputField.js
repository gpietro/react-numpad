import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Label = styled.label`
  color: ${props => (props.disabled ? props.theme.color.secondary : props.theme.color.primary)};
`;
Label.displayName = 'Label';

const getInputCoords = input => (input ? input.getBoundingClientRect() : undefined);

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
          <span
            onClick={() => showKeyPad(this.inputCoords)}
            ref={input => {
              this.inputCoords = getInputCoords(input);
            }}
          >
            {React.Children.map(children, child =>
              React.cloneElement(
                child,
                child.type === 'input'
                  ? {
                      placeholder,
                      value: inputValue ? displayRule(inputValue, dateFormat) : inputValue,
                      disabled,
                      readOnly: true,
                    }
                  : {}
              )
            )}
          </span>
        ) : (
          <span
            onClick={() => showKeyPad(this.inputCoords)}
            ref={input => {
              this.inputCoords = getInputCoords(input);
            }}
          >
            <input
              placeholder={placeholder}
              value={inputValue ? displayRule(inputValue, dateFormat) : inputValue}
              disabled={disabled}
              readOnly
            />
            {buttonContent && <button>{buttonContent}</button>}
          </span>
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
