import { useEffect, useState, useRef } from 'react';

export default function useKeyboardInput(initialValue, validKeys = []) {
  const [value, setValue] = useState(initialValue);
  const refValue = useRef(initialValue);
  const [keyDownEvent, setKeyDownEvent] = useState(null);

  function updateValue(newValue) {
    refValue.current = newValue;
    setKeyDownEvent(null);
    setValue(refValue.current);
  }

  function keyDownHandler(event) {
    const { key } = event;
    setKeyDownEvent(event);
    if (key === 'Backspace') {
      refValue.current = refValue.current.slice(0, -1);
      setValue(refValue.current);
    } else if (validKeys.length > 0) {
      if (validKeys.includes(key)) {
        refValue.current += key;
        setValue(refValue.current);
      }
    } else {
      refValue.current += key;
      setValue(refValue.current);
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

  return { value, keyDownEvent, updateValue, virtualInteraction };
}
