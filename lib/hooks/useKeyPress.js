import { useEffect } from 'react';

export default keyDown => {
  useEffect(() => {
    document.addEventListener('keydown', keyDown);

    return function cleanup() {
      document.removeEventListener('keydown', keyDown);
    };
  }, []);
};
