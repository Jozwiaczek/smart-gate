import React, { useMemo, useRef, useState } from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import useSound from 'use-sound';

import { DetailedKeyIcon } from '../../icons';
import switchOnSfx from '../../sounds/switch-on.mp3';
import { DEFAULT_THUMB_Y, THUMB_Y_TARGET } from './ToggleSlider.constants';
import {
  ArrowUp,
  InfoBox,
  InfoBoxLabel,
  PulseCircle,
  Slider,
  SliderTarget,
  SliderThumb,
  ThumbCircle,
  Wrapper,
} from './ToggleSlider.styled';

const PulseCircles = () => (
  <>
    <PulseCircle />
    <PulseCircle animationDelay={2} />
    <PulseCircle asOuter />
    <PulseCircle animationDelay={2} asOuter />
  </>
);

const ToggleSlider = () => {
  const [playTickSfx] = useSound(switchOnSfx);
  const nodeRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSnapped, setIsSnapped] = useState(false);
  const [thumbYPosition, setThumbYPosition] = useState(DEFAULT_THUMB_Y);
  const [slideProgress, setSlideProgress] = useState(0);

  const handleDragging = (e: DraggableEvent, { y }: DraggableData) => {
    setThumbYPosition(y);
    const newSlideProgress = Math.abs(y / THUMB_Y_TARGET) * 100;
    setSlideProgress(newSlideProgress);
  };

  const handleDragStart = () => {
    setIsDragging(true);
    playTickSfx();
  };

  const handleDragStop = () => {
    playTickSfx();
    setIsDragging(false);
    if (slideProgress === 100) {
      setThumbYPosition(THUMB_Y_TARGET);
      setIsSnapped(true);
      return;
    }
    setThumbYPosition(DEFAULT_THUMB_Y);
    setSlideProgress(0);
  };

  const keyIconRotateDegree = useMemo(() => (90 * slideProgress) / 100, [slideProgress]);

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
            >
              <DetailedKeyIcon />
            </ThumbCircle>
            <PulseCircles />
          </SliderThumb>
        </Draggable>
      </Slider>
    </Wrapper>
  );
};

ToggleSlider.displayName = 'ToggleSlider';

export default ToggleSlider;
