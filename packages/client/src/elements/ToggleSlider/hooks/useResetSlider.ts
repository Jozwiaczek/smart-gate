import { useCallback, useEffect, useState } from 'react';

import { useInterval } from '../../../hooks';
import {
  COMPLETED_TOGGLING_ANIMATION_DURATION,
  INITIAL_THUMB_POSITION,
  SLIDE_PROGRESS_MIN,
} from '../ToggleSlider.constants';
import { UseResetSliderProps } from '../ToggleSlider.types';

const useResetSlider = ({
  isHorizontal,
  thumbPosition,
  setThumbPosition,
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
    if (!isRun) {
      return;
    }

    if (
      isHorizontal
        ? thumbPosition <= INITIAL_THUMB_POSITION
        : thumbPosition >= INITIAL_THUMB_POSITION
    ) {
      setIsRun(false);
      setThumbPosition(INITIAL_THUMB_POSITION);
      setSlideProgress(SLIDE_PROGRESS_MIN);
      onComplete();
    }
  }, [isHorizontal, isRun, onComplete, setSlideProgress, setThumbPosition, thumbPosition]);

  useInterval({
    callback: () => {
      slideProgress > SLIDE_PROGRESS_MIN && setSlideProgress((prevState) => prevState - 10);

      if (isHorizontal) {
        thumbPosition > INITIAL_THUMB_POSITION && setThumbPosition((prevState) => prevState - 10);
      } else {
        thumbPosition < INITIAL_THUMB_POSITION && setThumbPosition((prevState) => prevState + 10);
      }
    },
    delay: 10,
    initDelay,
    disabled: !isRun,
  });

  return { resetSlider };
};

export default useResetSlider;
