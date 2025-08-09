import React, { type FC } from "react";
import useLongPress from "../hooks/useLongPress";

interface DisplayWrapperProps {
	value: string;
	backspace: () => void;
	longPressBackspace: () => void;
}

const DisplayWrapper: FC<DisplayWrapperProps> = ({
	value,
	backspace,
	longPressBackspace,
}) => {
	const backspaceLongPress = useLongPress(longPressBackspace, 1000);

	return (
		<div className="flex p-1 items-center border-none">
			<div className="flex-grow">
				<input
					value={value}
					readOnly
					className="w-full bg-transparent text-xl outline-none border-none cursor-not-allowed rounded-none"
				/>
			</div>
			<button
				type="button"
				{...backspaceLongPress}
				onClick={backspace}
				className="text-gray-800"
			>
				<span>&larr;</span>
			</button>
		</div>
	);
};

export default DisplayWrapper;
