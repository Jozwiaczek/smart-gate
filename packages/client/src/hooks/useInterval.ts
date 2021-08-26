import { useEffect, useRef } from 'react';

interface UseIntervalProps {
  callback: () => void;
  delay: number;
  initDelay?: number;
  disabled?: boolean;
}

const useInterval = ({ callback, delay, initDelay = 0, disabled = false }: UseIntervalProps) => {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (disabled) {
      return;
    }

    let intervalId: NodeJS.Timeout;
    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => savedCallback.current(), delay);
    }, initDelay);

    return () => {
      clearTimeout(timeoutId);
      intervalId && clearInterval(intervalId);
    };
  }, [delay, disabled, initDelay]);
};

export default useInterval;
