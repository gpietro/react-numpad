import { Button } from "@repo/ui/components/button";
import { useUnit } from "effector-react";
import { cn } from "@repo/ui/lib/utils";
import { pressKeyEvent } from "../../models/numpad";

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
    <div className={cn("grid grid-cols-3")}>
      {keypadKeys.map((key) => (
        <Button
          key={`button-${key}`}
          className={cn("text-2xl rounded-none w-full h-16")}
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
