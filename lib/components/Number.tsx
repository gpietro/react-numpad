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
	const validation = (value: string) =>
		numberValidator(decimal, negative)(value);

	let validator = keyValidator;
	if (!validator) {
		validator = (value: string) => numberValidator(decimal, negative)(value);
	}

	const keyValid = (key: string, value = "") => {
		if (key === "-") {
			return value.charAt(0) === "-" || validator(key + value);
		}
		return validator(key === "." ? `${value + key}1` : value + key);
	};

	const displayRule = (value: string) =>
		value.replace(/^(-)?0+(0\.|\d)/, "$1$2"); // remove leading zeros

	if (inline) {
		return (
			<StaticWrapper
				{...props}
				onChange={onChange}
				displayRule={displayRule}
				position={position}
			>
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
			position={position}
		>
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
