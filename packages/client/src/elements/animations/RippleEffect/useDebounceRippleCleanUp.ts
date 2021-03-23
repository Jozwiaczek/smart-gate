import { useLayoutEffect } from 'react';

const useDebouncedRippleCleanUp = (
  rippleCount: number,
  duration: number,
  cleanUp: () => void,
): void => {
  useLayoutEffect(() => {
    let bounce: NodeJS.Timeout;
    if (rippleCount > 0) {
      bounce = setTimeout(() => {
        cleanUp();
        clearTimeout(bounce);
      }, duration * 4);
    }

    return () => clearTimeout(bounce);
  }, [rippleCount, duration, cleanUp]);
};

export default useDebouncedRippleCleanUp;
