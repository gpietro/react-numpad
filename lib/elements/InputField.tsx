import type { ReactElement } from "react";
import React, { forwardRef, useRef } from "react";

interface InputFieldProps {
  showKeyPad: () => void;
  placeholder?: string;
  inputValue?: string;
  label?: string;
  disabled?: boolean;
  id?: string;
  customInput?: ReactElement | ReactElement[];
}

const InputField = forwardRef<HTMLButtonElement, InputFieldProps>(
  function InputField(
    { showKeyPad, placeholder, inputValue, label, disabled, customInput },
    ref
  ) {
    const input = useRef<HTMLInputElement>(null);

    const onShowKeyPad = () => {
      if (input.current) {
        input.current.blur();
      }
      showKeyPad();
    };

    return (
      <>
        {label && <label htmlFor={label}>{label}</label>}
        <button
          type="button"
          tabIndex={0}
          ref={ref}
          onClick={onShowKeyPad}
          onKeyPress={onShowKeyPad}
          data-testid="input-field">
          {customInput ? (
            React.Children.map(customInput, (child: ReactElement) =>
              // TODO: implement an input finder inside the children dom. Now it finds only at the first level deep.
              React.cloneElement(
                child,
                child.type === "input"
                  ? {
                      placeholder,
                      value: inputValue,
                      tabIndex: -1,
                      readOnly: true,
                      disabled,
                      "aria-hidden": true,
                    }
                  : {}
              )
            )
          ) : (
            <input
              id={label}
              style={{ outline: "none" }}
              ref={input}
              placeholder={placeholder}
              value={inputValue}
              disabled={disabled}
              onClick={onShowKeyPad}
              onKeyPress={onShowKeyPad}
              tabIndex={-1}
              readOnly
              aria-hidden
            />
          )}
        </button>
      </>
    );
  }
);

InputField.displayName = "InputField";

export default InputField;
