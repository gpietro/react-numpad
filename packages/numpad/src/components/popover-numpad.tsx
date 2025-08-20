import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@repo/ui/components/popover';
import { useUnit } from 'effector-react';
import React, { useRef, useState } from 'react';
import { cancelEvent, updateInitialValueEvent } from '../models/numpad';
import { InlineNumpad } from './inline-numpad';

type PopoverNumpadProps = {
  children?: React.ReactElement;
  position?: string;
  onChange?: (value: string) => void;
};

export const PopoverNumpad = ({
  children,
  position = 'center',
  onChange,
}: PopoverNumpadProps) => {
  const updateInitialValue = useUnit(updateInitialValueEvent);
  const cancel = useUnit(cancelEvent);

  const [show, setShow] = useState(false);
  const confirmedRef = useRef(false);

  const handleOnChange = (value: string) => {
    confirmedRef.current = true;
    setShow(false);
    onChange?.(value);
  };

  const handleOnCancel = () => {
    confirmedRef.current = true;
    cancel();
    setShow(false);
  };

  const handleOpenChange = (open: boolean) => {
    if (open) {
      confirmedRef.current = false;
      updateInitialValue();
    } else if (!confirmedRef.current) {
      cancel();
    }
    setShow(open);
  };

  const getSide = (position: string) => {
    if (position === 'flex-start' || position.includes('Top')) {
      return 'top';
    }
    if (position === 'flex-end' || position.includes('Bottom')) {
      return 'bottom';
    }
    return 'bottom'; // default for center
  };

  const getAlign = (position: string) => {
    if (position.includes('Left')) {
      return 'start';
    }
    if (position.includes('Right')) {
      return 'end';
    }
    return 'center'; // default for center, flex-start, flex-end
  };

  return (
    <Popover onOpenChange={handleOpenChange} open={show}>
      <PopoverTrigger asChild>
        {React.isValidElement(children) ? children : null}
      </PopoverTrigger>
      <PopoverContent
        align={getAlign(position)}
        className="w-auto p-0"
        side={getSide(position)}
        sideOffset={8}
      >
        <InlineNumpad onCancel={handleOnCancel} onChange={handleOnChange} />
      </PopoverContent>
    </Popover>
  );
};
