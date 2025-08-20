import { pressKeyEvent } from '@oggi/numpad/models/numpad';
import { Button } from '@repo/ui/components/button';
import { useUnit } from 'effector-react';

type KeypadProps = {
  keypadKeys: string[];
  onKeyPress?: (key: string) => void;
};

export const Keypad = ({ keypadKeys, onKeyPress }: KeypadProps) => {
  const pressKey = useUnit(pressKeyEvent);

  const handleKeyPress = (key: string) => {
    pressKey(key);
    onKeyPress?.(key);
  };

  return (
    <div className={'grid grid-cols-3'}>
      {keypadKeys.map((key) => (
        <Button
          className={'h-16 w-full rounded-none text-2xl'}
          key={`button-${key}`}
          onClick={() => handleKeyPress(key)}
          value={key}
          variant="ghost"
          // disabled={!keyValid(inputValue, key)}
        >
          {key}
        </Button>
      ))}
    </div>
  );
};
