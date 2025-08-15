import { fork } from "effector";
import { Provider } from "effector-react";
import { useRef } from "react";
import { InlineNumpad } from "./inline-numpad";
import { PopoverNumpad } from "./popover-numpad";

import type { NumPadProps } from "./inline-numpad";

export type NumpadProps = {
  inline?: boolean;
  children?: React.ReactNode;
} & NumPadProps;

export const Numpad = ({ inline = false, children, ...props }: NumpadProps) => {
  const scope = useRef(fork());

  const isInline = inline || !children;
  return (
    <Provider value={scope.current}>
      {isInline ? (
        <InlineNumpad {...props} />
      ) : (
        <PopoverNumpad {...props}>{children}</PopoverNumpad>
      )}
    </Provider>
  );
};
