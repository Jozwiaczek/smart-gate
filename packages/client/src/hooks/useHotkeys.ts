import { useCallback, useEffect } from 'react';

interface KeyHandler {
  key: string;
}

const useHotkeys = (targetKey: string | number, callback: () => void): void => {
  const keyDownHandler = useCallback(
    ({ key }: KeyHandler): void => {
      if (key === targetKey) {
        callback();
      }
    },
    [callback, targetKey],
  );

  useEffect(() => {
    window.addEventListener('keydown', keyDownHandler);
    return () => window.removeEventListener('keydown', keyDownHandler);
  }, [keyDownHandler]);
};

export default useHotkeys;
