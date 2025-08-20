import { useEffect, useState } from 'react';

export default function useLongPress(callback: () => void, ms = 300) {
  const [startLogPress, setStartLongPress] = useState(false);

  useEffect(() => {
    let timerId: number;
    if (startLogPress) {
      timerId = setTimeout(callback, ms);
    }

    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [startLogPress, callback, ms]);

  return {
    onMouseDown: () => setStartLongPress(true),
    onMouseUp: () => setStartLongPress(false),
    onMouseLeave: () => setStartLongPress(false),
    onTouchStart: () => setStartLongPress(true),
    onTouchEnd: () => setStartLongPress(false),
  };
}
