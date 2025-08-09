import Button from "@material-ui/core/Button";
import { action } from "@storybook/addon-actions";
import { number, text, withKnobs } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import { expect } from "chai";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from "react";
import { describe, it, specs } from "storybook-addon-specifications";
import styled from "styled-components";
import NumPad from "../lib";

configure({ adapter: new Adapter() });

const DisplayContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CustomInput = ({ value, ...props }) => {
	return (
		<div className="input-group">
			<input
				type="text"
				className="form-control displayPicker"
				placeholder="__"
				value={value}
				readOnly
			/>
		</div>
	);
};

const oddValidator = (value) =>
	Number.parseInt(value, 10) > 0 &&
	Number.parseInt(value, 10) % 2 !== 0 &&
	Number.parseFloat(value) % 1 === 0;

function StateValueTestComponent({ value }) {
	const [testValue, setValue] = useState(value);

	useEffect(() => {
		setValue(value);
	}, [value]);

	return (
		<NumPad.Number
			onChange={(v) => {
				setValue(v);
			}}
			position="center"
			value={testValue}
			negative={false}
			decimal={2}
		>
			<Button color="primary" variant="outlined">
				I'm custom, click me!
			</Button>
		</NumPad.Number>
	);
}

storiesOf("Number", module)
	.addDecorator(withKnobs)
	.add("default", () => {
		return (
			<DisplayContainer>
				<div>
					<NumPad.Number onChange={() => {}} position="center" label="Number" />
				</div>
				<NumPad.Number
					onChange={() => {
						action("onChange");
					}}
					inline
					sync
				/>
			</DisplayContainer>
		);
	})
	.add("hooks and mutable props example", () => {
		const value = number("Default value", 70, {
			range: true,
			min: 0,
			max: 90,
			step: 5,
		});
		return <StateValueTestComponent value={value} />;
	})
	.add("initial value", () => {
		const DemoNumber = () => {
			const [value, setValue] = useState(
				number("Default value", 70, { range: true, min: 0, max: 90, step: 5 }),
			);

			return (
				<DisplayContainer>
					<div>
						<NumPad.Number
							onChange={(newVal) => setValue(newVal)}
							position="startBottomRight"
							label="Number"
							value={value}
							negative={false}
							decimal={2}
						/>
					</div>
					<NumPad.Number
						onChange={(newVal) => setValue(newVal)}
						position="startBottomLeft"
						label="Number"
						value={value}
						negative={false}
						decimal={2}
					/>
				</DisplayContainer>
			);
		};

		return <DemoNumber />;
	})
	.add("positive number", () => (
		<NumPad.Number
			onChange={action("onChange")}
			value=""
			label="Number"
			decimal
			negative={false}
			position="center"
		/>
	))
	.add("positive integer", () => (
		<NumPad.Number
			decimal={false}
			negative={false}
			onChange={action("onChange")}
			value=""
			position="flex-start"
			label="Number"
		/>
	))
	.add("positive & negative number", () => (
		<NumPad.Number
			onChange={action("onChange")}
			value=""
			position="startBottomLeft"
			label="Number"
			decimal
			negative
		/>
	))
	.add("positive & negazive integer", () => (
		<NumPad.Number
			decimal={false}
			onChange={action("onChange")}
			value=""
			position="startBottomLeft"
			label="Number"
		/>
	))
	.add("configure decimals allowed", () => {
		return (
			<NumPad.Number
				onChange={action("onChange")}
				value=""
				position="startBottomLeft"
				label="Number"
				decimal={2}
			/>
		);
	})
	.add("odd numbers with custom validator", () => (
		<NumPad.Number
			keyValidator={oddValidator}
			onChange={action("onChange")}
			value=""
			position="startBottomLeft"
			label="Number"
		/>
	))
	.add("custom input field", () => (
		<NumPad.Number
			onChange={action("onChange")}
			value="5"
			position="startBottomLeft"
		>
			<CustomInput />
		</NumPad.Number>
	))
	.add("testing numbers", () => {
		const story = (
			<NumPad.Number
				onChange={action("onChange")}
				value=""
				position="startBottomLeft"
				label="Number"
				sync
			/>
		);
		specs(() =>
			describe("Check text", () => {
				it("Should have the Number label", () => {
					const wrapper = mount(story);
					expect(wrapper.text()).equal("Number");
				});
			}),
		);
		return story;
	});
