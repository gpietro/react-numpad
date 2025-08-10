import type { FC, ReactNode } from "react";
import type React from "react";
import { KeyPad } from "../elements";
import NumPad from "./NumPad";
import StaticWrapper from "./StaticWrapper";

const positiveValidation = (value: number): boolean => {
  // FIX -0 to be considered positive
  if (value === 0 && Object.is(value, -0)) {
    return false;
  }
  return value >= 0;
};

const integerValidation = (value: number): boolean => value % 1 === 0;

const numberValidator =
  (decimal: boolean | number, negative: boolean) =>
  (value: string): boolean => {
    if (value === "-" && negative) {
      return true;
    }
    if (Number.isNaN(Number(value))) {
      return false;
    }

    const floatValue = Number.parseFloat(value);

    if (!decimal && !integerValidation(floatValue)) {
      return false;
    }

    if (typeof decimal === "number" && decimal > 0) {
      if ((floatValue.toString().split(".")[1] || "").length > decimal) {
        return false;
      }
    }

    if (!negative && !positiveValidation(floatValue)) {
      return false;
    }
    return true;
  };

interface NumberInputProps {
  inline?: boolean;
  children?: ReactNode;
  keyValidator?: (value: string) => boolean;
  decimal?: boolean | number;
  negative?: boolean;
  onChange: (value: string) => void;
  value?: string | number;
  position?: string;
  label?: string;
}

const NumberInput: FC<NumberInputProps> = ({
  inline = false,
  children,
  keyValidator,
  decimal = true,
  negative = true,
  onChange,
  position = "center",
  ...props
}) => {
  // Always enforce built-in numeric rules; apply custom keyValidator as an additional constraint (AND)
  const baseValidator = numberValidator(decimal, negative);
  const validation = (value: string) =>
    baseValidator(value) && (keyValidator ? keyValidator(value) : true);

  const combinedValidator = (value: string) =>
    baseValidator(value) && (keyValidator ? keyValidator(value) : true);

  // When deciding whether a single key press should be enabled, don't require the
  // custom validator to already pass on the partial value. Instead, allow the key if
  // the resulting partial value is numeric-valid AND it either:
  //  - already satisfies the custom validator, or
  //  - could satisfy it after appending up to a few more digits.
  // This fixes cases like `value > 12 && value < 45`, where no single digit would pass
  // immediately and previously all keys were disabled.
  const couldBecomeValid = (partial: string, maxDepth = 3): boolean => {
    if (!keyValidator) return false;
    if (decimal === false && partial.includes(".")) return false;
    if (negative === false && partial.startsWith("-")) return false;
    // If already valid, we're good
    if (combinedValidator(partial)) return true;
    // If partial isn't even base-valid, no point extending
    if (!baseValidator(partial)) return false;

    // Breadth-limited search: try appending up to `maxDepth` digits to see if the
    // value can become valid. Keep it cheap to avoid perf issues.
    const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

    const stack: Array<{ v: string; d: number }> = [{ v: partial, d: 0 }];
    while (stack.length) {
      const popped = stack.pop();
      if (!popped) break;
      const { v, d } = popped;
      if (d >= maxDepth) continue;
      for (const dig of digits) {
        const candidate = v + dig;
        // Must remain base-valid as we build up
        if (!baseValidator(candidate)) continue;
        if (keyValidator(candidate)) return true;
        stack.push({ v: candidate, d: d + 1 });
      }
    }
    return false;
  };

  // Match KeyPad signature: (value, key)
  const keyValid = (value: string, key: string) => {
    if (key === "-") {
      // allow toggling sign only if resulting value passes validation
      return value.charAt(0) === "-" || combinedValidator(key + value);
    }
    // For ".", probe with a trailing digit to test decimal allowance
    const probeRaw = value + key;
    const probe = key === "." ? `${probeRaw}1` : probeRaw;
    const allowLookahead = value.length === 0 || value === "-";
    return (
      combinedValidator(probe) || (allowLookahead && couldBecomeValid(probeRaw))
    );
  };

  const displayRule = (value: string) =>
    value.replace(/^(-)?0+(0\.|\d)/, "$1$2"); // remove leading zeros

  if (inline) {
    return (
      <StaticWrapper
        {...props}
        onChange={onChange}
        displayRule={displayRule}
        position={position}>
        <KeyPad
          {...props}
          validation={validation}
          keyValid={keyValid}
          displayRule={displayRule}
          confirm={onChange}
          cancel={() => {}}
          update={() => {}}
          position={position}
        />
      </StaticWrapper>
    );
  }
  return (
    <NumPad
      {...props}
      customInput={children as React.ReactElement}
      onChange={onChange}
      displayRule={displayRule}
      position={position}>
      <KeyPad
        {...props}
        validation={validation}
        keyValid={keyValid}
        displayRule={displayRule}
        confirm={onChange}
        cancel={() => {}}
        update={() => {}}
        position={position}
      />
    </NumPad>
  );
};

export default NumberInput;
export { numberValidator, positiveValidation, integerValidation };
