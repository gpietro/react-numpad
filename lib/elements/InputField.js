/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

class InputField extends Component {
  constructor(props) {
    super(props);
    this.onShowKeyPad = this.onShowKeyPad.bind(this);
  }

  onShowKeyPad() {
    const { showKeyPad } = this.props;
    if (this.input) {
      this.input.blur();
    }
    const inputCoords = this.inputWrapper ? this.inputWrapper.getBoundingClientRect() : undefined;
    showKeyPad(inputCoords);
  }

  render() {
    const { placeholder, inputValue, label, disabled, buttonContent, customInput } = this.props;

    return (
      <Fragment>
        {label && <label disabled={disabled}>{label}</label>}
        <span
          onClick={this.onShowKeyPad}
          onKeyPress={this.onShowKeyPad}
          role="button"
          tabIndex={0}
          ref={wrapper => {
            this.inputWrapper = wrapper;
          }}
        >
          {customInput ? (
            React.Children.map(customInput, child =>
              React.cloneElement(
                child,
                child.type === 'input'
                  ? {
                      placeholder,
                      value: inputValue,
                      disabled,
                      tabIndex: -1,
                      readOnly: true,
                      ref: input => {
                        this.input = input;
                      },
                    }
                  : {}
              )
            )
          ) : (
            <Fragment>
              <input
                style={{ outline: 'none' }}
                ref={input => {
                  this.input = input;
                }}
                placeholder={placeholder}
                value={inputValue}
                disabled={disabled}
                tabIndex={-1}
                readOnly
              />
              {buttonContent && (
                <button type="button" tabIndex={-1}>
                  {buttonContent}
                </button>
              )}
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
  label: '',
  disabled: false,
  buttonContent: undefined,
  customInput: undefined,
};

InputField.propTypes = {
  showKeyPad: PropTypes.func.isRequired,
  inputValue: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  buttonContent: PropTypes.element,
  customInput: PropTypes.oneOfType([PropTypes.object, PropTypes.arrayOf(PropTypes.element)]),
};

export default InputField;
