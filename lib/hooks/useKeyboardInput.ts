import { useCallback, useEffect, useRef, useState } from "react";

export default function useKeyboardInput(
	initialValue: string,
	validKeys: string[] = [],
) {
	const [value, setValue] = useState(initialValue);
	const refValue = useRef(initialValue);
	const refValidKeys = useRef(validKeys);
	const [keyDownEvent, setKeyDownEvent] = useState<KeyboardEvent | null>(null);

	useEffect(() => {
		setKeyDownEvent(
			null,
		); /** Necessary to avoid computation of useEffect on initalValue change when event is old --> see test of '-' sign */
		setValue(initialValue);
	}, [initialValue]);

	useEffect(() => {
		refValue.current = value;
	}, [value]);

	useEffect(() => {
		refValidKeys.current = validKeys;
	}, [validKeys]);

	const keyDownHandler = useCallback((event: KeyboardEvent) => {
		const { key } = event;
		setKeyDownEvent(event);
		if (key === "Backspace") {
			setValue(refValue.current.slice(0, -1));
		} else if (refValidKeys.current.length > 0) {
			if (refValidKeys.current.includes(key)) {
				setValue(refValue.current + key);
			}
		}
	}, []);

	const virtualInteraction = (key: string) => {
		keyDownHandler(new KeyboardEvent("keydown", { key }));
	};
	useEffect(() => {
		document.addEventListener("keydown", keyDownHandler);

		return function cleanup() {
			document.removeEventListener("keydown", keyDownHandler);
		};
	}, [keyDownHandler]);

	return { value, keyDownEvent, virtualInteraction };
}
