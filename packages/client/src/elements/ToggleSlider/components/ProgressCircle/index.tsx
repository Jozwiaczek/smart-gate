import React from 'react';

import { SLIDER_WIDTH } from '../../ToggleSlider.constants';
import { STROKE_WIDTH } from './ProgressCircle.constants';
import { ProgressCircleWrapper } from './ProgressCircle.styled';

const ProgressCircle = ({ progress, isCompleted }: ProgressCircleProps) => {
  const circleSize = SLIDER_WIDTH + STROKE_WIDTH;
  const viewBox = `0 0 ${circleSize} ${circleSize}`;
  const radius = (circleSize - STROKE_WIDTH) / 2;
  const dashArray = radius * Math.PI * 2;
  const dashOffset = dashArray - (dashArray * progress) / 100;

  return (
    <ProgressCircleWrapper isCompleted={isCompleted}>
      <svg width={circleSize} height={circleSize} viewBox={viewBox}>
        <circle
          cx={circleSize / 2}
          cy={circleSize / 2}
          r={radius}
          strokeWidth={`${STROKE_WIDTH}px`}
          transform={`rotate(-90 ${circleSize / 2} ${circleSize / 2})`}
          strokeDasharray={dashArray}
          strokeDashoffset={dashOffset}
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </ProgressCircleWrapper>
  );
};

export default ProgressCircle;
