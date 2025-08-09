import React, { useRef, useCallback, type FC, type ReactNode } from "react";
import { Content } from "../elements/Wrapper";

interface StaticWrapperProps {
	children?: ReactNode;
	position: string;
	locale?: string;
	sync?: boolean;
	onChange: (value: string) => void;
	displayRule: (value: string) => string;
	value?: string | number;
}

const StaticWrapper: FC<StaticWrapperProps> = ({
	position = "center",
	onChange,
	displayRule,
	sync = false,
	children,
	locale = "en",
	value: valueFromProps = "",
}) => {
	const contentRef = useRef<HTMLDivElement>(null);

	const confirm = useCallback(
		(val: string) => {
			onChange(displayRule(val));
		},
		[onChange, displayRule],
	);

	// Update internal state, if sync is true call the external onChange callback on each change
	const update = useCallback(
		(val: string) => {
			if (sync) {
				onChange(displayRule(val));
			}
		},
		[sync, onChange, displayRule],
	);

	return (
		<Content position={position}>
			{React.cloneElement(children as React.ReactElement, {
				update,
				confirm,
				locale,
				position,
				ref: contentRef,
				value: valueFromProps.toString(),
			})}
		</Content>
	);
};

export default StaticWrapper;
