import React, { type FC } from "react";
import useLongPress from "../hooks/useLongPress";
import { Button } from "@/components/ui/button";

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
    <div className="flex items-center p-1 bg-popover text-popover-foreground border-b border-border">
      <div className="flex-grow">
        <input
          value={value}
          readOnly
          className="w-full bg-transparent text-xl outline-none border-0 cursor-not-allowed rounded-none"
        />
      </div>
      <Button
        type="button"
        {...backspaceLongPress}
        onClick={backspace}
        variant="ghost"
        className="text-muted-foreground h-8 w-8 p-0">
        <span>&larr;</span>
      </Button>
    </div>
  );
};

export default DisplayWrapper;
