import { useEffect, useState, useRef } from 'react';

export default function useKeyboardInput(initialValue, validKeys = []) {
  const [value, setValue] = useState(initialValue);
  const refValue = useRef(initialValue);
  const [keyDownEvent, setKeyDownEvent] = useState({ key: null });

  useEffect(() => {
    setKeyDownEvent({ key: null }); // Is it needed?
    refValue.current = initialValue;
  }, [initialValue]);

  useEffect(() => {
    refValue.current = value;
  }, [value]);

  function keyDownHandler(event) {
    const { key } = event;
    console.log('setKEyDownEvent', event);
    setKeyDownEvent(event);
    if (key === 'Backspace') {
      setValue(refValue.current.slice(0, -1));
    } else if (validKeys.length > 0) {
      if (validKeys.includes(key)) {
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
