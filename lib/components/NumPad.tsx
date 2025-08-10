import React, {
  useState,
  useLayoutEffect,
  useCallback,
  useRef,
  useEffect,
  type FC,
  type ReactNode,
} from "react";
import { Portal } from "react-portal";
import { InputField, Wrapper } from "../elements";

interface NumPadProps {
  children?: ReactNode;
  placeholder?: string;
  label?: string;
  id?: string;
  disabled?: boolean;
  locale?: string;
  markers?: string[];
  position: string;
  sync?: boolean;
  customInput?: React.ReactElement | React.ReactElement[];
  onChange: (value: string) => void;
  value?: string | number;
  formatInputValue?: (value: string | number) => string;
  displayRule: (value: string) => string;
}

const NumPad: FC<NumPadProps> = ({
  children,
  placeholder,
  label,
  id,
  disabled,
  locale,
  markers,
  position = "center",
  sync,
  customInput,
  onChange,
  value: valueFromProps = "",
  formatInputValue = (value) => value.toString(),
  displayRule,
}) => {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState<string>(formatInputValue(valueFromProps));
  const [preValue, setPreValue] = useState<string | number | undefined>();

  const inputRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (show && value !== formatInputValue(valueFromProps)) {
      setValue(formatInputValue(valueFromProps));
    }
  }, [show, value, valueFromProps, formatInputValue]);

  if (valueFromProps !== preValue) {
    setPreValue(valueFromProps);
    setValue(formatInputValue(valueFromProps));
  }

  const toggleKeyPad = () => {
    setShow(!show);
  };

  const confirm = (val: string) => {
    if (show) {
      toggleKeyPad();
      onChange(displayRule(val));
    }
  };

  const update = useCallback(
    (val: string) => {
      setValue(val);
      if (sync) {
        onChange(displayRule(val));
      }
    },
    [sync, onChange, displayRule]
  );

  const display =
    position !== "flex-start" && position !== "flex-end" ? show : true;

  return (
    <>
      <InputField
        id={id}
        placeholder={placeholder}
        showKeyPad={toggleKeyPad}
        inputValue={valueFromProps.toString()}
        label={label}
        disabled={show || disabled}
        customInput={customInput}
        ref={inputRef}
      />
      <Portal>
        {display && (
          <Wrapper position={position}>
            {React.cloneElement(children as React.ReactElement, {
              cancel: toggleKeyPad,
              confirm,
              update,
              value,
              position,
              label,
              locale,
              markers,
              sync,
              ref: contentRef,
            })}
          </Wrapper>
        )}
      </Portal>
    </>
  );
};

export default NumPad;
