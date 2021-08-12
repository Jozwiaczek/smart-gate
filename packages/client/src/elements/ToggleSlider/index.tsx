import React, { useMemo, useRef, useState } from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import { useTranslation } from 'react-i18next';
import useSound from 'use-sound';

import { useSnackbar } from '../../hooks';
import { DetailedKeyIcon } from '../../icons';
import switchOnSfx from '../../sounds/switch-on.mp3';
import unlockSfx from '../../sounds/unlock.mp3';
import ProgressCircle from './components/ProgressCircle';
import PulsatingCircles from './components/PulsatingCircles';
import useResetSlider from './hooks/useResetSlider';
import useTogglingProgress from './hooks/useTogglingProgress';
import {
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

const ToggleSlider = () => {
  const thumbYTarget = -(SLIDER_HEIGHT - SLIDER_WIDTH);
  const [playTickSfx] = useSound(switchOnSfx);
  const [playUnlockSfx] = useSound(unlockSfx);
  const showSnackbar = useSnackbar();
  const { t } = useTranslation();
  const nodeRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSnapped, setIsSnapped] = useState(false);
  const [thumbYPosition, setThumbYPosition] = useState(DEFAULT_THUMB_Y);
  const [slideProgress, setSlideProgress] = useState(SLIDE_PROGRESS_MIN);
  const { resetSlider } = useResetSlider({
    thumbYPosition,
    setThumbYPosition,
    slideProgress,
    setSlideProgress,
    onComplete: () => {
      setIsSnapped(false);
      setSlideProgress(SLIDE_PROGRESS_MIN);
      setIsDragging(false);
    },
  });
  const { isTogglingProgressCompleted, togglingProgress, runTogglingProgress } =
    useTogglingProgress({
      onComplete: () => {
        playUnlockSfx();
        showSnackbar({ message: t('routes.dashboard.toggleSuccess'), severity: 'success' });
        resetSlider();
      },
    });

  const handleDragging = (e: DraggableEvent, { y }: DraggableData) => {
    setThumbYPosition(y);
    const newSlideProgress = Math.abs(y / thumbYTarget) * 100;
    setSlideProgress(newSlideProgress);
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragStop = () => {
    setIsDragging(false);
    if (slideProgress === SLIDE_PROGRESS_MAX) {
      playTickSfx();
      setThumbYPosition(thumbYTarget);
      setIsSnapped(true);
      runTogglingProgress();
      return;
    }
    resetSlider(0);
  };

  const keyIconRotateDegree = useMemo(
    () => (90 * slideProgress) / SLIDE_PROGRESS_MAX,
    [slideProgress],
  );

  return (
    <Wrapper data-testid="toggleSlider">
      <InfoBox>
        <InfoBoxLabel>Swipe up to toggle</InfoBoxLabel>
      </InfoBox>
      <Slider>
        <SliderTarget>
          <ArrowUp isDragging={isDragging} />
        </SliderTarget>
        <Draggable
          axis="y"
          handle=".handle"
          nodeRef={nodeRef}
          bounds="parent"
          disabled={isSnapped}
          position={{ x: 0, y: thumbYPosition }}
          onStart={handleDragStart}
          onDrag={handleDragging}
          onStop={handleDragStop}
        >
          <SliderThumb className="handle" ref={nodeRef} disabledPulsing={isDragging || isSnapped}>
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
