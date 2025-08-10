import React, { memo, type FC } from "react";
import { Button } from "./ui";

interface ButtonWrapperProps {
  value: string | number;
  click: (value: string | number) => void;
  disabled?: boolean;
}

const ButtonWrapper: FC<ButtonWrapperProps> = memo(
  ({ value, click, disabled }) => (
    <Button
      type="button"
      onClick={() => click(value)}
      disabled={disabled}
      variant="ghost"
      className="text-2xl rounded-none w-1/3 h-16">
      {value}
    </Button>
  )
);

export default ButtonWrapper;
