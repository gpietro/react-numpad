import React, {
  useState,
  useLayoutEffect,
  useCallback,
  useRef,
  useEffect,
  type FC,
  type ReactNode,
} from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
  onClickOutside?: "accept" | "cancel";
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
  onClickOutside = "cancel",
}) => {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState<string>(formatInputValue(valueFromProps));
  const [initialValue, setInitialValue] = useState<string>("");
  const [preValue, setPreValue] = useState<string | number | undefined>();

  const inputRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Sync with props when they change
  useEffect(() => {
    if (valueFromProps !== preValue) {
      setPreValue(valueFromProps);
      setValue(formatInputValue(valueFromProps));
    }
  }, [valueFromProps, preValue, formatInputValue]);

  // Handle initial value setup when opening
  useEffect(() => {
    if (show && !initialValue) {
      const formattedValue = formatInputValue(valueFromProps);
      setInitialValue(formattedValue);
      if (value !== formattedValue) {
        setValue(formattedValue);
      }
    }
  }, [show, initialValue, valueFromProps, formatInputValue, value]);

  const handleToggleKeyPad = useCallback(() => {
    setShow(!show);
  }, [show]);

  const handleCancel = useCallback(() => {
    setValue(initialValue || formatInputValue(valueFromProps));
    setShow(false);
  }, [initialValue, valueFromProps, formatInputValue]);

  const handleConfirm = useCallback(
    (val: string) => {
      setShow(false);
      onChange(displayRule(val));
    },
    [displayRule, onChange]
  );

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!open && show) {
        // Popover is being closed
        if (onClickOutside === "accept") {
          setShow(false);
          onChange(displayRule(value));
        } else {
          setValue(initialValue || formatInputValue(valueFromProps));
          setShow(false);
        }
      } else if (open && !show) {
        setShow(true);
      }
    },
    [
      show,
      onClickOutside,
      displayRule,
      onChange,
      formatInputValue,
      valueFromProps,
      value,
      initialValue,
    ]
  );

  const handleUpdate = useCallback(
    (val: string) => {
      setValue(val);
      if (sync) {
        onChange(displayRule(val));
      }
    },
    [sync, displayRule, onChange]
  );

  const getSide = (position: string) => {
    if (position === "flex-start" || position.includes("Top")) return "top";
    if (position === "flex-end" || position.includes("Bottom")) return "bottom";
    return "bottom"; // default for center
  };

  const getAlign = (position: string) => {
    if (position.includes("Left")) return "start";
    if (position.includes("Right")) return "end";
    return "center"; // default for center, flex-start, flex-end
  };

  return (
    <Popover open={show} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <InputField
          id={id}
          placeholder={placeholder}
          showKeyPad={handleToggleKeyPad}
          inputValue={valueFromProps.toString()}
          label={label}
          disabled={disabled}
          customInput={customInput}
          ref={inputRef}
        />
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-0"
        align={getAlign(position)}
        side={getSide(position)}
        sideOffset={8}>
        {React.cloneElement(children as React.ReactElement, {
          cancel: handleCancel,
          confirm: handleConfirm,
          update: handleUpdate,
          value,
          position,
          label,
          locale,
          markers,
          sync,
          ref: contentRef,
        })}
      </PopoverContent>
    </Popover>
  );
};

export default NumPad;
