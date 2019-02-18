import { useState, useEffect } from 'react';

export default function useLongPress(callback = () => {}, ms = 300) {
  const [startLogPress, setStartLongPress] = useState(false);

  useEffect(() => {
    let timerId;
    if (startLogPress) {
      timerId = setTimeout(callback, ms);
    } else {
      clearTimeout(timerId);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [startLogPress]);

  return {
    onMouseDown: () => setStartLongPress(true),
    onMouseUp: () => setStartLongPress(false),
    onMouseLeave: () => setStartLongPress(false),
    onTouchStart: () => setStartLongPress(true),
    onTouchEnd: () => setStartLongPress(false),
  };
}
