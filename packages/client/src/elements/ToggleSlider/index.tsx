import React, { useCallback, useMemo, useRef, useState } from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import { useTranslation } from 'react-i18next';
import useSound from 'use-sound';

import { DetailedKeyIcon } from '../../icons';
import switchOnSfx from '../../sounds/switch-on.mp3';
import unlockSfx from '../../sounds/unlock.mp3';
import ProgressCircle from './components/ProgressCircle';
import PulsatingCircles from './components/PulsatingCircles';
import useResetSlider from './hooks/useResetSlider';
import useTogglingProgress from './hooks/useTogglingProgress';
import {
  AFTER_SUCCESS_INFO_DISPLAY_DURATION,
  DEFAULT_THUMB_Y,
  SLIDE_PROGRESS_MAX,
  SLIDE_PROGRESS_MIN,
  SLIDER_HEIGHT,
  SLIDER_WIDTH,
} from './ToggleSlider.constants';
import {
  ArrowUp,
  InfoBox,
  InfoBoxLabel,
  Slider,
  SliderTarget,
  SliderThumb,
  ThumbCircle,
  Wrapper,
} from './ToggleSlider.styled';
import { InfoBoxState, ToggleSliderProps } from './ToggleSlider.types';

const THUMB_Y_TARGET = -(SLIDER_HEIGHT - SLIDER_WIDTH);

const ToggleSlider = ({ onToggle }: ToggleSliderProps) => {
  const { t } = useTranslation();
  const [playTickSfx] = useSound(switchOnSfx);
  const [playUnlockSfx] = useSound(unlockSfx);
  const draggableSliderThumbRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSnapped, setIsSnapped] = useState(false);
  const [thumbYPosition, setThumbYPosition] = useState(DEFAULT_THUMB_Y);
  const [slideProgress, setSlideProgress] = useState(SLIDE_PROGRESS_MIN);
  const [infoBoxState, setInfoBoxState] = useState<InfoBoxState>('default');

  const onCompleteSliderReset = useCallback(() => {
    if (infoBoxState !== 'default') {
      setTimeout(() => {
        setInfoBoxState('default');
      }, AFTER_SUCCESS_INFO_DISPLAY_DURATION);
    }
    setIsSnapped(false);
    setSlideProgress(SLIDE_PROGRESS_MIN);
    setIsDragging(false);
  }, [infoBoxState]);

  const { resetSlider } = useResetSlider({
    thumbYPosition,
    setThumbYPosition,
    slideProgress,
    setSlideProgress,
    onComplete: onCompleteSliderReset,
  });

  const onCompleteTogglingProgress = useCallback(() => {
    setInfoBoxState('success');
    playUnlockSfx();
    onToggle();
    resetSlider();
  }, [onToggle, playUnlockSfx, resetSlider]);

  const { isTogglingProgressCompleted, togglingProgress, runTogglingProgress } =
    useTogglingProgress({
      onComplete: onCompleteTogglingProgress,
    });

  const handleDragging = useCallback((event: DraggableEvent, { y }: DraggableData) => {
    setThumbYPosition(y);
    const newSlideProgress = Math.abs(y / THUMB_Y_TARGET) * 100;
    setSlideProgress(newSlideProgress);
  }, []);

  const handleDragStart = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleDragStop = useCallback(() => {
    setIsDragging(false);
    if (slideProgress === SLIDE_PROGRESS_MAX) {
      playTickSfx();
      setThumbYPosition(THUMB_Y_TARGET);
      setIsSnapped(true);
      runTogglingProgress();
      return;
    }
    resetSlider(0);
  }, [playTickSfx, resetSlider, runTogglingProgress, slideProgress]);

  const keyIconRotateDegree = useMemo(
    () => (90 * slideProgress) / SLIDE_PROGRESS_MAX,
    [slideProgress],
  );

  const infoBoxMessage = useMemo(() => {
    if (infoBoxState === 'success') {
      return t('routes.dashboard.toggleSuccess');
    }
    return t('routes.dashboard.swipeUpToToggle');
  }, [infoBoxState, t]);

  return (
    <Wrapper data-testid="toggleSlider">
      <InfoBox state={infoBoxState}>
        <InfoBoxLabel state={infoBoxState}>{infoBoxMessage}</InfoBoxLabel>
      </InfoBox>
      <Slider>
        <SliderTarget>
          <ArrowUp isDragging={isDragging} />
        </SliderTarget>
        <Draggable
          axis="y"
          handle=".handle"
          nodeRef={draggableSliderThumbRef}
          bounds="parent"
          disabled={isSnapped}
          position={{ x: 0, y: thumbYPosition }}
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
              isToggled={isTogglingProgressCompleted}
            >
              <DetailedKeyIcon />
            </ThumbCircle>
            <ProgressCircle progress={togglingProgress} isCompleted={isTogglingProgressCompleted} />
            <PulsatingCircles />
          </SliderThumb>
        </Draggable>
      </Slider>
    </Wrapper>
  );
};

ToggleSlider.displayName = 'ToggleSlider';

export default ToggleSlider;
