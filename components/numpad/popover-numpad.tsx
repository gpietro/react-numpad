import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { InlineNumpad } from "./inline-numpad";
import { useUnit } from "effector-react";
import { updateInitialValueEvent } from "@/models/numpad";

interface PopoverNumpadProps {
  children?: React.ReactElement;
  position?: string;
  onChange?: (value: string) => void;
}

export const PopoverNumpad = ({
  children,
  position = "center",
  onChange = () => {},
}: PopoverNumpadProps) => {
  const updateInitialValue = useUnit(updateInitialValueEvent);

  const [show, setShow] = useState(false);
  const [value, setValue] = useState("");

  const handleOnChange = (value: string) => {
    setShow(false);
    setValue(value);
    onChange(value);
  };

  const handleOpenChange = (open: boolean) => {
    if (open) {
      updateInitialValue();
    }
    setShow(open);
  };

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
        {React.isValidElement(children) ? children : null}
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-0"
        align={getAlign(position)}
        side={getSide(position)}
        sideOffset={8}>
        <InlineNumpad onChange={handleOnChange} />
      </PopoverContent>
    </Popover>
  );
};
