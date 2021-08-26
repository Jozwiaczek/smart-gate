import { useCallback, useEffect, useState } from 'react';

import { useInterval } from '../../../hooks';
import {
  COMPLETED_TOGGLING_ANIMATION_DURATION,
  DEFAULT_THUMB_Y,
  SLIDE_PROGRESS_MIN,
} from '../ToggleSlider.constants';
import { UseResetSliderProps } from '../ToggleSlider.types';

const useResetSlider = ({
  thumbYPosition,
  setThumbYPosition,
  slideProgress,
  setSlideProgress,
  onComplete,
}: UseResetSliderProps) => {
  const [isRun, setIsRun] = useState(false);
  const [initDelay, setInitDelay] = useState(COMPLETED_TOGGLING_ANIMATION_DURATION);

  const resetSlider = useCallback((initialDelay?: number) => {
    setIsRun(true);
    if (initialDelay === undefined) {
      setInitDelay(COMPLETED_TOGGLING_ANIMATION_DURATION);
      return;
    }
    setInitDelay(initialDelay);
  }, []);

  useEffect(() => {
    if (thumbYPosition >= DEFAULT_THUMB_Y && isRun) {
      setIsRun(false);
      setThumbYPosition(DEFAULT_THUMB_Y);
      setSlideProgress(SLIDE_PROGRESS_MIN);
      onComplete();
    }
  }, [isRun, onComplete, setSlideProgress, setThumbYPosition, thumbYPosition]);

  useInterval({
    callback: () => {
      thumbYPosition < DEFAULT_THUMB_Y && setThumbYPosition((prevState) => prevState + 10);
      slideProgress > SLIDE_PROGRESS_MIN && setSlideProgress((prevState) => prevState - 10);
    },
    delay: 10,
    initDelay,
    disabled: !isRun,
  });

  return { resetSlider };
};

export default useResetSlider;
