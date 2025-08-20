import {
  $display,
  $initialValue,
  backspaceEvent,
  cancelEvent,
  pressKeyEvent,
} from '@oggi/numpad/models/numpad';
import { useUnit } from 'effector-react';
import React, { useEffect, useRef } from 'react';
import { Display, type DisplayRef } from './display';
import { Header } from './header';
import { Keypad } from './keypad';

const keypadKeysDefault = [
  '7',
  '8',
  '9',
  '4',
  '5',
  '6',
  '1',
  '2',
  '3',
  '-',
  '0',
  '.',
];

export type NumPadProps = {
  keypadKeys?: string[];
  onChange?: (value: string) => void;
  onCancel?: () => void;
  focus?: boolean;
  children?: React.ReactNode;
};

export const InlineNumpad = ({
  keypadKeys = keypadKeysDefault,
  onChange,
  onCancel,
  focus = true,
  children,
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
    onChange?.(displayValue);
  };

  const handleOnCancel = () => {
    cancel();
    onChange?.(initialValue);
    onCancel?.();
  };

  // Handle keyboard events only when the display input has focus
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = event;

    if (key === 'Backspace') {
      event.preventDefault();
      backspace();
    } else if (key === 'Escape') {
      handleOnCancel();
    } else if (key === 'Enter') {
      event.preventDefault();
      onChange?.(displayValue);
    } else if (keypadKeys.includes(key)) {
      event.preventDefault();
      pressKey(key);
    }
  };

  // Focus the display input when the NumPad is clicked
  const handleNumPadClick = (event: React.MouseEvent) => {
    // Only focus if we're not clicking on an interactive element
    const target = event.target as HTMLElement;
    if (!target.closest('button, input')) {
      displayRef.current?.focus();
    }
  };

  // Handle container keyboard events (for when tabIndex is focused)
  const handleContainerKeyDown = (event: React.KeyboardEvent) => {
    // Forward keyboard events to the display input
    const { key } = event;
    if (keypadKeys.includes(key) || key === 'Backspace') {
      displayRef.current?.focus();
      // Let the event bubble to the display input
    }
  };

  // Handle keypad button presses - ensure display stays focused
  const handleKeypadPress = () => {
    // Keep the display focused when using keypad buttons
    displayRef.current?.focus();
  };

  return (
    <>
      {React.isValidElement(children) ? children : null}
      {/** biome-ignore lint/a11y/noStaticElementInteractions: <explanation> */}
      <div
        className="max-w-xs border border-gray-200 dark:border-gray-700"
        onClick={handleNumPadClick}
        onKeyDown={handleContainerKeyDown}
        role="presentation"
        // biome-ignore lint/a11y/noNoninteractiveTabindex: <explanation>
        tabIndex={0}
      >
        <Header
          label="Calculator"
          onCancel={handleOnCancel}
          onConfirm={handleOnChange}
        />
        <Display onKeyDown={handleKeyDown} ref={displayRef} />
        <Keypad keypadKeys={keypadKeys} onKeyPress={handleKeypadPress} />
      </div>
    </>
  );
};
