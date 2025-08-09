import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";
import NumPad from "../index";

afterEach(cleanup);

const onChange = () => {};

test("number", async () => {
	const { container, getByText, getByRole, getByTestId } = render(
		<NumPad.Number onChange={onChange} />,
	);

	await waitFor(() => {
		fireEvent.click(getByTestId("input-field"));
	});

	fireEvent.click(getByText("1"));
	const display = getByRole("display") as HTMLInputElement;
	expect(display.value).toBe("1");

	fireEvent.keyDown(container, { key: "3" });
	expect(display.value).toBe("13");

	fireEvent.keyDown(container, { key: "-" });
	expect(display.value).toBe("-13");

	fireEvent.keyDown(container, { key: "2" });
	expect(display.value).toBe("-132");

	fireEvent.keyDown(container, { key: "." });
	expect(display.value).toBe("-132.");

	fireEvent.keyDown(container, { key: "." });
	expect(display.value).toBe("-132.");

	fireEvent.keyDown(container, { key: "0" });
	expect(display.value).toBe("-132.0");
});

test("decimal with negative", async () => {
	const { container, getByRole, getByTestId } = render(
		<NumPad.Number decimal={2} onChange={onChange} />,
	);

	await waitFor(() => {
		fireEvent.click(getByTestId("input-field"));
	});

	const display = getByRole("display") as HTMLInputElement;

	fireEvent.keyDown(container, { key: "." });
	expect(display.value).toBe("0.");

	fireEvent.keyDown(container, { key: "3" });
	expect(display.value).toBe("0.3");

	fireEvent.keyDown(container, { key: "-" });
	expect(display.value).toBe("-0.3");

	fireEvent.keyDown(container, { key: "1" });
	expect(display.value).toBe("-0.31");

	fireEvent.keyDown(container, { key: "1" });
	expect(display.value).toBe("-0.31");

	fireEvent.keyDown(container, { key: "-" });
	expect(display.value).toBe("0.31");

	fireEvent.keyDown(container, { key: "-" });
	expect(display.value).toBe("-0.31");
});

test("oddValidator", async () => {
	const oddValidator = (value: string) =>
		Number.parseInt(value, 10) % 2 !== 0 && Number.parseFloat(value) % 1 === 0;

	const { container, getByText, getByRole, getByTestId } = render(
		<NumPad.Number keyValidator={oddValidator} onChange={onChange} />,
	);

	await waitFor(() => {
		fireEvent.click(getByTestId("input-field"));
	});

	fireEvent.click(getByText("1"));
	const display = getByRole("display") as HTMLInputElement;
	expect(display.value).toBe("1");

	fireEvent.keyDown(container, { key: "3" });
	expect(display.value).toBe("13");

	fireEvent.keyDown(container, { key: "-" });
	expect(display.value).toBe("-13");

	fireEvent.keyDown(container, { key: "-" });
	expect(display.value).toBe("13");

	fireEvent.keyDown(container, { key: "2" });
	expect(display.value).toBe("13");

	fireEvent.keyDown(container, { key: "2" });
	expect(display.value).toBe("13");

	fireEvent.keyDown(container, { key: "2" });
	expect(display.value).toBe("13");

	fireEvent.keyDown(container, { key: "2" });
	expect(display.value).toBe("13");

	fireEvent.keyDown(container, { key: "5" });
	expect(display.value).toBe("135");

	fireEvent.keyDown(container, { key: "-" });
	expect(display.value).toBe("-135");

	fireEvent.keyDown(container, { key: "-" });
	expect(display.value).toBe("135");

	fireEvent.keyDown(container, { key: "Backspace" });
	expect(display.value).toBe("13");
});

test("positive number", async () => {
	const { container, getByText, getByRole, getByTestId } = render(
		<NumPad.Number negative={false} onChange={onChange} />,
	);

	await waitFor(() => {
		fireEvent.click(getByTestId("input-field"));
	});

	const display = getByRole("display") as HTMLInputElement;

	fireEvent.click(getByText("."));
	expect(display.value).toBe("0.");

	fireEvent.click(getByText("-"));
	expect(display.value).toBe("0.");

	fireEvent.click(getByText("."));
	expect(display.value).toBe("0.");

	fireEvent.keyDown(container, { key: "Backspace" });
	expect(display.value).toBe("0");

	fireEvent.click(getByText("1"));
	expect(display.value).toBe("1");

	fireEvent.keyDown(container, { key: "3" });
	expect(display.value).toBe("13");

	fireEvent.keyDown(container, { key: "-" });
	expect(display.value).toBe("13");

	fireEvent.keyDown(container, { key: "2" });
	expect(display.value).toBe("132");

	fireEvent.keyDown(container, { key: "." });
	expect(display.value).toBe("132.");

	fireEvent.keyDown(container, { key: "." });
	expect(display.value).toBe("132.");

	fireEvent.keyDown(container, { key: "0" });
	expect(display.value).toBe("132.0");
});

test("positive integer", async () => {
	const { container, getByText, getByRole, getByTestId } = render(
		<NumPad.Number negative={false} decimal={false} onChange={onChange} />,
	);

	await waitFor(() => {
		fireEvent.click(getByTestId("input-field"));
	});

	const display = getByRole("display") as HTMLInputElement;

	fireEvent.click(getByText("-"));
	expect(display.value).toBe("");

	fireEvent.click(getByText("1"));
	expect(display.value).toBe("1");

	fireEvent.keyDown(container, { key: "3" });
	expect(display.value).toBe("13");

	fireEvent.keyDown(container, { key: "-" });
	expect(display.value).toBe("13");

	fireEvent.keyDown(container, { key: "2" });
	expect(display.value).toBe("132");

	fireEvent.keyDown(container, { key: "." });
	expect(display.value).toBe("132");

	fireEvent.keyDown(container, { key: "." });
	expect(display.value).toBe("132");

	fireEvent.keyDown(container, { key: "0" });
	expect(display.value).toBe("1320");
});

test("minus sign", async () => {
	const { container, getByRole, getByTestId } = render(
		<NumPad.Number onChange={onChange} />,
	);

	await waitFor(() => {
		fireEvent.click(getByTestId("input-field"));
	});

	const display = getByRole("display") as HTMLInputElement;

	fireEvent.keyDown(container, { key: "-" });
	expect(display.value).toBe("-");

	fireEvent.keyDown(container, { key: "-" });
	expect(display.value).toBe("");

	fireEvent.keyDown(container, { key: "-" });
	expect(display.value).toBe("-");

	fireEvent.keyDown(container, { key: "." });
	expect(display.value).toBe("-0.");

	fireEvent.keyDown(container, { key: "-" });
	expect(display.value).toBe("0.");
});
