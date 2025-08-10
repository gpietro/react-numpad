import React, { type FC } from "react";
import { Button } from "./ui";
import useLongPress from "../hooks/useLongPress";

interface DisplayWrapperProps {
  value: string;
  backspace: () => void;
  longPressBackspace: () => void;
}

const DisplayWrapper: FC<DisplayWrapperProps> = ({
  value,
  backspace,
  longPressBackspace,
}) => {
  const backspaceLongPress = useLongPress(longPressBackspace, 1000);

  return (
    <div className="flex p-1 items-center border-none">
      <div className="flex-grow">
        <input
          value={value}
          readOnly
          className="w-full bg-transparent text-xl outline-none border-none cursor-not-allowed rounded-none"
        />
      </div>
      <Button
        type="button"
        {...backspaceLongPress}
        onClick={backspace}
        variant="ghost"
        className="text-gray-800 h-8 w-8 p-0">
        <span>&larr;</span>
      </Button>
    </div>
  );
};

export default DisplayWrapper;
