import { useEffect, useRef } from "react";
import { useUnit } from "effector-react";
import { Display, type DisplayRef } from "./display";
import { Header } from "./header";
import { Keypad } from "./keypad";
import {
  pressKeyEvent,
  backspaceEvent,
  $display,
  $initialValue,
  cancelEvent,
} from "../../models/numpad";

const keypadKeysDefault = [
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

export type NumPadProps = {
  keypadKeys?: string[];
  onChange?: (value: string) => void;
  focus?: boolean;
};

export const InlineNumpad = ({
  keypadKeys = keypadKeysDefault,
  onChange = () => {},
  focus = true,
}: NumPadProps) => {
  const displayRef = useRef<DisplayRef>(null);
  const [pressKey, backspace] = useUnit([pressKeyEvent, backspaceEvent]);
  const [cancel, displayValue, initialValue] = useUnit([
    cancelEvent,
    $display,
    $initialValue,
  ]);

  useEffect(() => {
    focus && displayRef.current?.focus();
  }, [focus]);

  const handleOnChange = () => {
    onChange(displayValue);
  };

  const handleOnCancel = () => {
    cancel();
    onChange(initialValue);
  };

  // Handle keyboard events only when the display input has focus
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = event;

    if (key === "Backspace") {
      event.preventDefault();
      backspace();
    } else if (key === "Enter") {
      event.preventDefault();
      onChange(displayValue);
    } else if (keypadKeys.includes(key)) {
      event.preventDefault();
      pressKey(key);
    }
  };

  // Focus the display input when the NumPad is clicked
  const handleNumPadClick = (event: React.MouseEvent) => {
    // Only focus if we're not clicking on an interactive element
    const target = event.target as HTMLElement;
    if (!target.closest("button, input")) {
      displayRef.current?.focus();
    }
  };

  // Handle container keyboard events (for when tabIndex is focused)
  const handleContainerKeyDown = (event: React.KeyboardEvent) => {
    // Forward keyboard events to the display input
    const { key } = event;
    if (keypadKeys.includes(key) || key === "Backspace") {
      displayRef.current?.focus();
      // Let the event bubble to the display input
    }
  };

  // Handle keypad button presses - ensure display stays focused
  const handleKeypadPress = (key: string) => {
    // Keep the display focused when using keypad buttons
    displayRef.current?.focus();
  };

  return (
    <div
      className="max-w-xs bg-slate-200"
      onClick={handleNumPadClick}
      onKeyDown={handleContainerKeyDown}
      // biome-ignore lint/a11y/noNoninteractiveTabindex: <explanation>
      tabIndex={0}>
      <Header
        label="Calculator"
        onConfirm={handleOnChange}
        onCancel={handleOnCancel}
      />
      <Display ref={displayRef} onKeyDown={handleKeyDown} />
      <Keypad keypadKeys={keypadKeys} onKeyPress={handleKeypadPress} />
    </div>
  );
};
