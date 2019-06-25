/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { useRef, forwardRef } from 'react';
import PropTypes from 'prop-types';

const InputField = forwardRef(function InputField(
  { showKeyPad, placeholder, inputValue, label, disabled, customInput },
  ref
) {
  const input = useRef(null);

  const onShowKeyPad = () => {
    if (input.current) {
      input.current.blur();
    }
    showKeyPad();
  };

  return (
    <>
      {label && <label disabled={disabled}>{label}</label>}
      <span role="button" tabIndex={0} ref={ref} disabled={disabled}>
        {customInput ? (
          React.Children.map(customInput, child =>
            // TODO: implement an input finder inside the children dom. Now it finds only at the first level deep.
            React.cloneElement(
              child,
              child.type === 'input'
                ? {
                    ...child.props,
                    placeholder,
                    value: inputValue,
                    onClick: onShowKeyPad,
                    onKeyPress: onShowKeyPad,
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
              onClick={onShowKeyPad}
              onKeyPress={onShowKeyPad}
              tabIndex={-1}
              readOnly
            />
          </>
        )}
      </span>
    </>
  );
});

InputField.displayName = 'InputField';

InputField.defaultProps = {
  placeholder: '',
  inputValue: '',
  label: '',
  disabled: false,
  customInput: undefined,
};

InputField.propTypes = {
  showKeyPad: PropTypes.func.isRequired,
  inputValue: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  customInput: PropTypes.oneOfType([PropTypes.object, PropTypes.arrayOf(PropTypes.element)]),
};

export default InputField;
