import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { afterEach, test, expect } from "vitest";
import React from "react";
import NumPad from "../index";

afterEach(cleanup);

test("minus button click should work", async () => {
  const onChange = () => {};
  const { getByText, getByRole, getByTestId } = render(
    <NumPad.Number onChange={onChange} />
  );

  // Open the keypad
  await waitFor(() => {
    fireEvent.click(getByTestId("input-field"));
  });

  const display = getByRole("textbox") as HTMLInputElement;

  // Test clicking minus button when empty should add minus sign
  expect(display.value).toBe("");
  fireEvent.click(getByText("-"));
  expect(display.value).toBe("-");

  // Add a digit
  fireEvent.click(getByText("5"));
  expect(display.value).toBe("-5");

  // Click minus to remove sign
  fireEvent.click(getByText("-"));
  expect(display.value).toBe("5");

  // Click minus again to add sign back
  fireEvent.click(getByText("-"));
  expect(display.value).toBe("-5");
});
