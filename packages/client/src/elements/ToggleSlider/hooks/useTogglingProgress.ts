import { useCallback, useEffect, useState } from 'react';

import { useInterval } from '../../../hooks';
import { UseTogglingProgressProps } from '../ToggleSlider.types';

const useTogglingProgress = ({ onComplete }: UseTogglingProgressProps) => {
  const delay = 3;
  const initValue = 0;
  const targetValue = 100;
  const [isRun, setIsRun] = useState(false);
  const [progress, setProgress] = useState(initValue);
  const [isCompleted, setIsCompleted] = useState(false);

  const run = useCallback(() => {
    setIsCompleted(false);
    setProgress(initValue);
    setIsRun(true);
  }, []);

  useEffect(() => {
    if (progress >= targetValue && isRun) {
      setIsCompleted(true);
      setIsRun(false);
      onComplete();
    }
  }, [isRun, onComplete, progress, targetValue]);

  useInterval({
    callback: () => {
      progress < targetValue && setProgress((prevState) => prevState + 1);
    },
    delay,
    initDelay: 0,
    disabled: !isRun,
  });

  return {
    isTogglingProgressCompleted: isCompleted,
    togglingProgress: progress,
    runTogglingProgress: run,
  };
};

export default useTogglingProgress;
