import { useEffect, useLayoutEffect, useState, useRef } from 'react';

export default function useKeyboardInput(initialValue, validKeys = []) {
  const [value, setValue] = useState(initialValue);
  const refValue = useRef(initialValue);
  const refValidKeys = useRef(validKeys);
  const [keyDownEvent, setKeyDownEvent] = useState(null);

  useEffect(() => {
    setKeyDownEvent(null); // Is it needed?
    setValue(initialValue);
  }, [initialValue]);

  useLayoutEffect(() => {
    refValue.current = value;
  }, [value]);

  useLayoutEffect(() => {
    refValidKeys.current = validKeys;
  }, [validKeys]);

  function keyDownHandler(event) {
    const { key } = event;
    setKeyDownEvent(event);
    if (key === 'Backspace') {
      setValue(refValue.current.slice(0, -1));
    } else if (refValidKeys.current.length > 0) {
      if (refValidKeys.current.includes(key)) {
        setValue(refValue.current + key);
      }
    } else {
      setValue(refValue.current + key);
    }
  }

  function virtualInteraction(key) {
    keyDownHandler(new KeyboardEvent('keydown', { key }));
  }
  useEffect(() => {
    document.addEventListener('keydown', keyDownHandler);

    return function cleanup() {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, []);

  return { value, keyDownEvent, virtualInteraction };
}
