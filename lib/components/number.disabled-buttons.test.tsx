import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { afterEach, test, expect } from "vitest";
import React from "react";
import NumPad from "../index";

afterEach(cleanup);

test("'-' and '.' remain disabled when negative/decimal are false, even with custom keyValidator", async () => {
  const { getByText } = render(
    <NumPad.Number
      inline
      negative={false}
      decimal={false}
      // custom validator should not re-enable '-' or '.'
      keyValidator={(value) => {
        const n = Number(value);
        return Number.isNaN(n) ? false : n < 45;
      }}
      onChange={() => {}}
    />
  );

  // Inline mode renders the keypad immediately; no need to click the trigger.

  const minusBtn = getByText("-") as HTMLButtonElement;
  const dotBtn = getByText(".") as HTMLButtonElement;

  // Initially disabled
  expect(minusBtn.disabled).toBe(true);
  expect(dotBtn.disabled).toBe(true);

  // Enter a number
  fireEvent.click(getByText("1"));

  // Should still be disabled
  expect(minusBtn.disabled).toBe(true);
  expect(dotBtn.disabled).toBe(true);
});

test("'0' should be disabled when keyValidator requires value > 12", async () => {
  const { getByText } = render(
    <NumPad.Number
      inline
      negative={false}
      decimal={false}
      keyValidator={(value) => Number(value) > 12 && Number(value) < 45}
      onChange={() => {}}
    />
  );

  const zeroBtn = getByText("0") as HTMLButtonElement;

  // '0' should be disabled initially since 0 is not > 12
  expect(zeroBtn.disabled).toBe(true);
});
