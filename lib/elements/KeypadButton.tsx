import React, { memo, type FC } from "react";

interface ButtonWrapperProps {
	value: string | number;
	click: (value: string | number) => void;
	disabled?: boolean;
}

const ButtonWrapper: FC<ButtonWrapperProps> = memo(
	({ value, click, disabled }) => (
		<button
			type="button"
			onClick={() => click(value)}
			disabled={disabled}
			className="text-2xl p-0 rounded-none w-1/3"
		>
			{value}
		</button>
	),
);

export default ButtonWrapper;
