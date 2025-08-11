import type React from "react";
import { type FC, forwardRef, useCallback, useEffect, useState } from "react";
import useOnClickOutside from "use-onclickoutside";

import useKeyboardInput from "../hooks/useKeyboardInput";
import Display from "./Display";
import Button from "./KeypadButton";

interface KeyPadProps {
  displayRule: (value: string) => string;
  position: string;
  validation: (value: string) => boolean;
  label?: string;
  confirm: (value: string) => void;
  cancel: () => void;
  keyValid: (value: string, key: string) => boolean;
  value?: string | number;
  update: (value: string) => void;
  sync?: boolean;
}

const KeyPad: FC<KeyPadProps> = forwardRef<HTMLDivElement, KeyPadProps>(
  (
    {
      displayRule,
      position,
      validation,
      label,
      confirm,
      cancel,
      keyValid,
      value = "",
      update,
      sync,
    },
    ref
  ) => {
    const keypadKeys = [
      "7",
      "8",
      "9",
      "4",
      "5",
      "6",
      "1",
      "2",
      "3",
      "-",
      "0",
      ".",
    ];
    const keyboardKeys = [...Array(10).keys()].map((v) => v.toString());
    const [inputValue, setInputValue] = useState(value.toString());
    const keyboard = useKeyboardInput(
      inputValue,
      keyboardKeys.filter((key) => keyValid(inputValue, key))
    );

    const computeNextKey = useCallback(
      (newValue: string, key: string) => {
        let computedValue: string | undefined;
        if (key === "-") {
          if (inputValue.charAt(0) === "-") {
            computedValue = inputValue.substr(1);
          } else {
            const candidate = `-${inputValue}`;
            if (validation(candidate)) {
              computedValue = candidate;
            }
          }
        } else if (keyValid(inputValue, key)) {
          if (key === ".") {
            const leadingZero = ["", "-"].includes(inputValue);
            computedValue = `${inputValue}${leadingZero ? "0" : ""}${key}`;
          } else {
            computedValue = newValue;
          }
        }
        if (computedValue !== undefined) {
          setInputValue(computedValue);
          if (sync) {
            update(computedValue);
          }
        }
      },
      [inputValue, keyValid, sync, update, validation]
    );

    useOnClickOutside(ref as React.RefObject<HTMLElement>, () => {
      if (validation(inputValue)) {
        confirm(inputValue);
      } else {
        cancel();
      }
    });

    // Reload props.value into the state
    useEffect(() => {
      setInputValue(value.toString());
    }, [value]);

    const [lastProcessedEvent, setLastProcessedEvent] =
      useState<KeyboardEvent | null>(null);

    useEffect(() => {
      if (
        keyboard.keyDownEvent &&
        keyboard.keyDownEvent !== lastProcessedEvent
      ) {
        setLastProcessedEvent(keyboard.keyDownEvent);
        /** useKeyBaordInput set null when initializing the initialValue to avoid this computation before validation  */
        if (
          ["Enter", "Tab"].includes(keyboard.keyDownEvent.key) &&
          validation(keyboard.value)
        ) {
          confirm(keyboard.value);
        } else if (["Escape"].includes(keyboard.keyDownEvent.key)) {
          cancel();
        } else if (["Backspace"].includes(keyboard.keyDownEvent.key)) {
          if (keyboard.keyDownEvent.ctrlKey || keyboard.keyDownEvent.altKey) {
            setInputValue("");
          } else {
            setInputValue(keyboard.value);
          }
        } else {
          // For non-digit keys like "-" and ".", use inputValue since keyboard.value won't be updated
          const valueToUse = /^[0-9]$/.test(keyboard.keyDownEvent.key)
            ? keyboard.value
            : inputValue;
          computeNextKey(valueToUse, keyboard.keyDownEvent.key);
        }
      }
    }, [
      keyboard.value,
      keyboard.keyDownEvent,
      lastProcessedEvent,
      confirm,
      cancel,
      validation,
      computeNextKey,
      inputValue,
    ]);

    const onButtonClick = useCallback(
      (clickedKey: string | number) =>
        keyboard.virtualInteraction(clickedKey.toString()),
      [keyboard]
    );

    const contentClasses =
      position === "fullscreen" ? "w-screen h-screen text-2xl" : "w-64";

    return (
      <div
        className={`flex flex-col transition-all duration-500 ease-in-out bg-card text-card-foreground border border-border ${contentClasses}`}
        ref={ref}>
        <div className="flex justify-between p-1 items-center bg-primary text-primary-foreground select-none">
          <button type="button" onClick={cancel}>
            <span>&times;</span>
          </button>
          <div className="overflow-hidden text-xl whitespace-nowrap overflow-ellipsis">
            {label}
          </div>
          <button
            type="button"
            onClick={() => confirm(inputValue)}
            disabled={!validation(inputValue)}>
            <span>&crarr;</span>
          </button>
        </div>
        <Display
          value={displayRule(inputValue)}
          backspace={() => keyboard.virtualInteraction("Backspace")}
          longPressBackspace={() => setInputValue("")}
        />
        <div className="flex flex-wrap flex-grow bg-muted">
          {keypadKeys.map((key) => (
            <Button
              key={`button-${key}`}
              click={onButtonClick}
              value={key}
              disabled={!keyValid(inputValue, key)}
            />
          ))}
        </div>
      </div>
    );
  }
);

export default KeyPad;
