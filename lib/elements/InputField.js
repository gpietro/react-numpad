/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { useRef } from 'react';
import PropTypes from 'prop-types';

const InputField = ({
  showKeyPad,
  placeholder,
  inputValue,
  label,
  disabled,
  buttonContent,
  customInput,
}) => {
  const input = useRef(null);
  const inputWrapper = useRef(null);

  const onShowKeyPad = () => {
    input.current.blur();
    const inputCoords = inputWrapper.current.getBoundingClientRect();
    showKeyPad(inputCoords);
  };

  return (
    <>
      {label && <label disabled={disabled}>{label}</label>}
      <span
        onClick={onShowKeyPad}
        onKeyPress={onShowKeyPad}
        role="button"
        tabIndex={0}
        ref={inputWrapper}
      >
        {customInput ? (
          React.Children.map(customInput, child =>
            // TODO: implement an input finder inside the children dom. Now it finds only at the first level deep.
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
                      input = input;
                    },
                  }
                : {}
            )
          )
        ) : (
          <>
            <input
              style={{ outline: 'none' }}
              ref={input}
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
          </>
        )}
      </span>
    </>
  );
};

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
