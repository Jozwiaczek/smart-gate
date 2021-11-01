import React, { useCallback, useMemo, useRef, useState } from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import { useTranslation } from 'react-i18next';
import useSound from 'use-sound';

import mountSfx from '../../sounds/mount.mp3';
import unlockSfx from '../../sounds/unlock.mp3';
import unmountSfx from '../../sounds/unmount.mp3';
import ProgressCircle from './components/ProgressCircle';
import PulsatingCircles from './components/PulsatingCircles';
import useResetSlider from './hooks/useResetSlider';
import useToggleLoading from './hooks/useToggleLoading';
import {
  AFTER_SUCCESS_INFO_DISPLAY_DURATION,
  INITIAL_THUMB_POSITION,
  SLIDE_PROGRESS_MAX,
  SLIDE_PROGRESS_MIN,
  SLIDER_HEIGHT,
  SLIDER_WIDTH,
} from './ToggleSlider.constants';
import {
  HintArrow,
  InfoBox,
  InfoBoxLabel,
  Slider,
  SliderTarget,
  SliderThumb,
  StyledDetailedKeyIcon,
  ThumbCircle,
  Wrapper,
} from './ToggleSlider.styled';
import { InfoBoxState, ToggleSliderProps } from './ToggleSlider.types';

const ToggleSlider = ({ onToggle, orientation = 'vertical' }: ToggleSliderProps) => {
  const { t } = useTranslation();
  const [playMountSfx] = useSound(mountSfx);
  const [playUnmountSfx] = useSound(unmountSfx);
  const [playUnlockSfx] = useSound(unlockSfx);
  const draggableSliderThumbRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSnapped, setIsSnapped] = useState(false);
  const [thumbPosition, setThumbPosition] = useState(INITIAL_THUMB_POSITION);
  const [slideProgress, setSlideProgress] = useState(SLIDE_PROGRESS_MIN);
  const [infoBoxState, setInfoBoxState] = useState<InfoBoxState>('default');
  const isHorizontal = orientation === 'horizontal';

  const targetThumbPosition = isHorizontal
    ? -(SLIDER_WIDTH - SLIDER_HEIGHT)
    : -(SLIDER_HEIGHT - SLIDER_WIDTH);

  const onCompleteSliderReset = useCallback(() => {
    if (infoBoxState === 'success') {
      setTimeout(() => {
        setInfoBoxState('default');
      }, AFTER_SUCCESS_INFO_DISPLAY_DURATION);
    }

    setIsSnapped(false);
    setSlideProgress(SLIDE_PROGRESS_MIN);
    setIsDragging(false);
  }, [infoBoxState]);

  const { resetSlider } = useResetSlider({
    isHorizontal,
    thumbPosition,
    setThumbPosition,
    slideProgress,
    setSlideProgress,
    onComplete: onCompleteSliderReset,
  });

  const onCompleteToggleLoading = useCallback(() => {
    setInfoBoxState('success');
    playUnlockSfx();
    onToggle();
    resetSlider();
  }, [onToggle, playUnlockSfx, resetSlider]);

  const { isToggleLoadingCompleted, toggleLoadingProgress, runToggleLoading } = useToggleLoading({
    onComplete: onCompleteToggleLoading,
  });

  const handleDragging = useCallback(
    (event: DraggableEvent, { y, x }: DraggableData) => {
      const newThumbPosition = isHorizontal ? x : y;
      setThumbPosition(newThumbPosition);
      const newSlideProgress = Math.abs(newThumbPosition / targetThumbPosition) * 100;
      setSlideProgress(newSlideProgress);
    },
    [isHorizontal, targetThumbPosition],
  );

  const handleDragStart = useCallback(() => {
    setIsDragging(true);
    playUnmountSfx();
  }, [playUnmountSfx]);

  const handleDragStop = useCallback(() => {
    setIsDragging(false);
    if (slideProgress === SLIDE_PROGRESS_MAX) {
      playMountSfx();
      setThumbPosition(targetThumbPosition);
      setIsSnapped(true);
      runToggleLoading();
      return;
    }
    resetSlider(0);
  }, [playMountSfx, resetSlider, runToggleLoading, slideProgress, targetThumbPosition]);

  const keyIconRotateDegree = useMemo(
    () => (90 * slideProgress) / SLIDE_PROGRESS_MAX,
    [slideProgress],
  );

  const infoBoxMessage = useMemo(() => {
    if (infoBoxState === 'success') {
      return t('routes.dashboard.sections.toggling.toggleSuccess');
    }
    return t('routes.dashboard.sections.toggling.swipeToToggle');
  }, [infoBoxState, t]);

  return (
    <Wrapper data-testid="toggleSlider">
      <InfoBox state={infoBoxState}>
        <InfoBoxLabel state={infoBoxState}>{infoBoxMessage}</InfoBoxLabel>
      </InfoBox>
      <Slider isHorizontal={isHorizontal}>
        <SliderTarget isHorizontal={isHorizontal}>
          <HintArrow isDragging={isDragging} isHorizontal={isHorizontal} />
        </SliderTarget>
        <Draggable
          axis={isHorizontal ? 'x' : 'y'}
          handle=".handle"
          nodeRef={draggableSliderThumbRef}
          bounds="parent"
          disabled={isSnapped}
          position={isHorizontal ? { x: thumbPosition, y: 0 } : { x: 0, y: thumbPosition }}
          onStart={handleDragStart}
          onDrag={handleDragging}
          onStop={handleDragStop}
        >
          <SliderThumb
            className="handle"
            ref={draggableSliderThumbRef}
            disabledPulsing={isDragging || isSnapped}
          >
            <ThumbCircle
              isSnapped={isSnapped}
              isDragging={isDragging}
              rotateDegree={keyIconRotateDegree}
              isToggled={isToggleLoadingCompleted}
            >
              <StyledDetailedKeyIcon $isHorizontal={isHorizontal} />
            </ThumbCircle>
            <ProgressCircle
              progress={toggleLoadingProgress}
              isCompleted={isToggleLoadingCompleted}
            />
            <PulsatingCircles />
          </SliderThumb>
        </Draggable>
      </Slider>
    </Wrapper>
  );
};

ToggleSlider.displayName = 'ToggleSlider';

export default ToggleSlider;
