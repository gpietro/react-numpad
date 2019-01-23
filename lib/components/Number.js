import React from "react";
import IconEdit from "react-icons/lib/md/edit";
import NumPad from "./NumPad";
import { KeyPad } from "../elements";

const DefaultValidation = {
  float: () => true,
  negative: () => true
};

const PositiveValidation = {
  float: () => true,
  negative: value => parseInt(value, 10) > 0
};

const IntegerValidation = {
  float: value => parseFloat(value) % 1 === 0,
  negative: () => true
};

const PositiveIntegerValidation = {
  float: value => parseFloat(value) % 1 === 0,
  negative: value => parseInt(value, 10) > 0
};

const validation = Validation => value =>
  !isNaN(value) && Validation.float(value) && Validation.negative(value);

const defaultProps = Validation => ({
  element: KeyPad,
  validation: validation(Validation),
  formatInputValue: value => value.toString(), // TODO
  keyValid: (value = "", key) => {
    let next;
    if (key === "-") {
      next = key + value + 1;
    } else {
      next = key === "." ? value + key + 1 : value + key;
    }
    // eslint-disable-next-line no-restricted-globals
    return validation(Validation)(next);
  },
  displayRule: value => value.replace(/^(-)?0+(0\.|\d)/, "$1$2"), // remove leading zeros
  inputButtonContent: <IconEdit />
});

const Number = NumPad(defaultProps(DefaultValidation));
const PositiveNumber = NumPad(defaultProps(PositiveValidation));
const IntegerNumber = NumPad(defaultProps(IntegerValidation));
const PositiveIntegerNumber = NumPad(defaultProps(PositiveIntegerValidation));

export { Number, PositiveNumber, IntegerNumber, PositiveIntegerNumber };
