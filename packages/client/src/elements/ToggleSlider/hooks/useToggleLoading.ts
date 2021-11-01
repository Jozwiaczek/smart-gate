import { useCallback, useEffect, useState } from 'react';

import { useInterval } from '../../../hooks';
import { UseTogglingProgressProps } from '../ToggleSlider.types';

const INIT_VALUE = 0;
const TARGET_VALUE = 100;
const FPS = 60;

const useToggleLoading = ({ onComplete, duration = 250 }: UseTogglingProgressProps) => {
  const [isRun, setIsRun] = useState(false);
  const [progress, setProgress] = useState(INIT_VALUE);
  const [isCompleted, setIsCompleted] = useState(false);

  const run = useCallback(() => {
    setIsCompleted(false);
    setProgress(INIT_VALUE);
    setIsRun(true);
  }, []);

  useEffect(() => {
    if (progress >= TARGET_VALUE && isRun) {
      setIsCompleted(true);
      setIsRun(false);
      onComplete();
    }
  }, [isRun, onComplete, progress]);

  const increaseValueRate = TARGET_VALUE / (FPS * (duration / 1000));
  const intervalDelay = 1000 / FPS;

  useInterval({
    callback: () => {
      if (progress >= TARGET_VALUE) {
        return;
      }

      setProgress((prevState) => {
        const newProgressValue = prevState + increaseValueRate;
        if (newProgressValue >= TARGET_VALUE) {
          return TARGET_VALUE;
        }
        return newProgressValue;
      });
    },
    delay: intervalDelay,
    initDelay: 0,
    disabled: !isRun,
  });

  return {
    isToggleLoadingCompleted: isCompleted,
    toggleLoadingProgress: progress,
    runToggleLoading: run,
  };
};

export default useToggleLoading;
